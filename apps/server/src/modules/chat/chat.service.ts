import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isValidUUID } from 'common';
import { schema } from 'db-schema';
import { and, asc, desc, eq, inArray, ne, or, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle.service';
import { DbTransaction } from 'src/shared/types/misc';

@Injectable()
export class ChatService {
  constructor(private drizzleService: DrizzleService) {}

  async sendMessage(
    sender: string,
    threadId: string,
    message: string,
  ): Promise<void> {
    await this.drizzleService.db.transaction(async (txn) => {
      await txn
        .insert(schema.chat_message)
        .values({ message, sender, thread_id: threadId })
        .execute();
    });
  }

  async getMessages(threadId: string, user_uid: string) {
    const messages = await this.drizzleService.db.transaction(async (txn) => {
      const threads = await this.getThreads(user_uid);
      const thread = threads.find(t=>t.thread_id===threadId)
      if (!thread) throw new BadRequestException('Thread is not available');
      // Fetch messages in the specified thread
      const messages = await txn
        .select()
        .from(schema.chat_message)
        .where(eq(schema.chat_message.thread_id, threadId))
        .orderBy(asc(schema.chat_message.created_at))
        .execute();

      // Prepare message details with sender's name and avatar
      const messageDetailsPromises = messages.map(async (message) => {
        const sender = await txn
          .select()
          .from(schema.user)
          .where(eq(schema.user.uid, message.sender))
          .execute();

        if (!sender || sender.length === 0) {
          return null;
        }

        return {
          message_id: message.message_id,
          message: message.message,
          created_at: message.created_at,
          sender: {
            name: `${sender[0].first_name} ${sender[0].last_name}`,
            // @ts-ignore
            avatar: sender[0].avatar, // Replace with actual avatar field
          },
        };
      });

      return {thread: thread,messages: await Promise.all(messageDetailsPromises)};
    });

    return messages;
  }

  async getThreads(userId: string) {
    const threads = await this.drizzleService.db.transaction(async (txn) => {
      // Fetch threads where the user is participating
      const threads = await txn
        .select()
        .from(schema.chat_thread_participant)
        .where(eq(schema.chat_thread_participant.user_uid, userId))
        .execute();

      // Prepare thread information
      const threadInfoPromises = threads.map(async (thread) => {
        const otherParticipant = await txn
          .select()
          .from(schema.chat_thread_participant)
          .where(
            and(
              eq(schema.chat_thread_participant.thread_id, thread.thread_id),
              ne(schema.chat_thread_participant.user_uid, userId),
            ),
          )
          .execute();

        if (!otherParticipant || otherParticipant.length === 0) {
          return null; // Filter out threads without other participants
        }

        const otherUser = await txn
          .select()
          .from(schema.user)
          .where(eq(schema.user.uid, otherParticipant[0].user_uid))
          .execute();

        if (!otherUser || otherUser.length === 0) {
          return null; // Filter out threads with invalid other users
        }

        const lastMessage = await txn
          .select()
          .from(schema.chat_message)
          .where(eq(schema.chat_message.thread_id, thread.thread_id))
          .orderBy(desc(schema.chat_message.created_at))
          .limit(1)
          .execute();

        return {
          thread_id: thread.thread_id,
          other_user_uid: otherUser[0].uid,
          other_user_name: `${otherUser[0].first_name} ${otherUser[0].last_name}`,
          last_message:
            lastMessage.length > 0
              ? {
                  message_id: lastMessage[0].message_id,
                  sender_name: `${otherUser[0].first_name} ${otherUser[0].last_name}`,
                  message_content: lastMessage[0].message,
                  created_at: lastMessage[0].created_at,
                }
              : null,
          other_user_avatar: undefined, // Replace with actual avatar field
        };
      });

      const threadInfos = await Promise.all(threadInfoPromises);
      return threadInfos.filter((thread) => thread !== null); // Filter out null threads
    });

    return threads;
  }

  async initThread(
    participant1IdOrEmail: string,
    participant2IdOrEmail: string,
  ) {
    // Find user UIDs based on provided IDs or emails
    const participants = await this.drizzleService.db.transaction(
      async (txn) => {
        const participant1 = await this.findUserByUidOrEmail(
          participant1IdOrEmail,
        );
        const participant2 = await this.findUserByUidOrEmail(
          participant2IdOrEmail,
        );

        if (!participant1 || !participant2) {
          throw new NotFoundException('Participants not found.');
        }

        // const [common] = await txn
        //   .select()
        //   .from(schema.chat_thread_participant)
        //   .where(
        //     inArray(schema.chat_thread_participant.user_uid, [
        //       participant1.uid,
        //       participant2.uid,
        //     ]),
        //   )
        //   .groupBy(schema.chat_thread.thread_id)
        //   .having(sql`COUNT(DISTINCT user_uid) = 2`);

        // if (common.thread_id) {
        //   throw new BadRequestException(
        //     `Thread already exists with id[${common.thread_id}]`,
        //   );
        // }

        const [thread] = await txn
          .insert(schema.chat_thread)
          .values({})
          .returning()
          .execute();

        // Add participants to the chat_thread_participant table
        await txn
          .insert(schema.chat_thread_participant)
          .values([
            { user_uid: participant1.uid, thread_id: thread.thread_id },
            { user_uid: participant2.uid, thread_id: thread.thread_id },
          ])
          .execute();

        return thread.thread_id;
      },
    );
    return participants;
  }

  private async findUserByUidOrEmail(uidOrEmail: string) {
    console.log(uidOrEmail, ' is valid UUID', isValidUUID(uidOrEmail));
    let condition = [];
    if (isValidUUID(uidOrEmail)) {
      console.log(uidOrEmail, ' is valid UUID');
      condition.push(eq(schema.user.uid, uidOrEmail));
    } else {
      condition.push(eq(schema.user.email, uidOrEmail));
    }
    const user = await this.drizzleService.db
      .select()
      .from(schema.user)
      .where(or(...condition));

    if (user.length === 0) {
      return null;
    }

    return user[0];
  }
}
