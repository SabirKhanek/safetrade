import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { commonZodResponse } from "../utils/common";

extendZodWithOpenApi(z);
const c = initContract();
export const chat = c.router(
  {
    initThread: {
      body: z.object({ participant: z.string().email() }),
      path: "/initThread",
      method: "POST",
      responses: {
        200: z.object({ ...commonZodResponse, thread_id: z.string().uuid() }),
      },
    },
    sendMessge: {
      body: z.object({ message: z.string(), thread_id: z.string().uuid() }),
      path: "/send",
      method: "POST",
      responses: { 200: z.object({ ...commonZodResponse }) },
    },
    getThreads: {
      path: "/get-threads",
      method: "GET",
      responses: {
        200: z.array(
          z.object({
            thread_id: z.string().uuid(),
            other_user_name: z.string(),
            other_user_uid: z.string().uuid(),
            last_message: z
              .object({
                message_id: z.string(),
                sender_name: z.string(),
                message_content: z.string(),
                created_at: z.date(),
              })
              .nullable(),
            other_user_avatar: z.string().optional(), // Adjust to the actual type of avatar
          })
        ),
      },
    },
    getMessagesInThread: {
      method: "GET",
      path: "/get-messages-in-thread",
      query: z.object({ thread_id: z.string().uuid() }),
      responses: {
        200: z.object({
          messages: z.array(
            z.object({
              message_id: z.string(),
              message: z.string(),
              created_at: z.date(),
              sender: z.object({
                name: z.string(),
                avatar: z.string().optional(), // Adjust to the actual type of avatar
              }),
            })
          ),
          thread: z.object({
            thread_id: z.string().uuid(),
            other_user_name: z.string(),
            other_user_uid: z.string().uuid(),
            last_message: z
              .object({
                message_id: z.string(),
                sender_name: z.string(),
                message_content: z.string(),
                created_at: z.date(),
              })
              .nullable(),
            other_user_avatar: z.string().optional(), // Adjust to the actual type of avatar
          }),
        }),
      },
    },
  },
  { pathPrefix: "/chat" }
);
