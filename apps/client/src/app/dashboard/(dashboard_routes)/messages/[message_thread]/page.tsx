"use client";

import { apiClient } from "@/api-client";
import { Loading } from "@/components/loading";
import { useAuthState } from "@/components/providers/authstate-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { apiQueryClient } from "@/react-query-client";
import { GetPublicUrl } from "@/shared/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageThreadPage() {
  const param = useParams();
  const message_thread = param.message_thread;
  const { error, data, isLoading } =
    apiQueryClient.chat.getMessagesInThread.useQuery(
      [`chat_thread_${message_thread}`],
      {
        query: { thread_id: message_thread as unknown as string },
      },
      { staleTime: 1000, refetchInterval: 1000 }
    );

  const queryClient = useQueryClient();
  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loading></Loading>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert>
        <AlertTitle>There was an error fetching chat thread!</AlertTitle>
        <AlertDescription>
          <pre>{JSON.stringify(error.body)}</pre>
        </AlertDescription>
      </Alert>
    );
  }

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     queryClient.invalidateQueries([`chat_thread_${message_thread}`]);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const d = data.body;
  const authState = useAuthState();
  const ownId = authState.user?.uid;
  return (
    <>
      <div className="h-full w-full grid grid-rows-[1fr_8fr_1fr]">
        <div className="border-b flex gap-2 p-3 w-full">
          <Avatar className="min-w-fit">
            <AvatarImage>
              {GetPublicUrl(d.thread.other_user_avatar || "")}
            </AvatarImage>
          </Avatar>
          <span>{d.thread.other_user_name}</span>
        </div>
        <ScrollArea className="h-full">
          <div className="p-3">
            {d.messages.map(
              (msg: {
                message: string;
                message_id: string;
                created_at: Date;
                sender: { name: string; avatar?: string | undefined };
              }) => (
                <div key={msg.message_id} className="mb-4 flex items-start">
                  <Avatar className="min-w-fit mr-3">
                    <AvatarImage>
                      {GetPublicUrl(msg.sender.avatar || "")}
                    </AvatarImage>
                    <AvatarFallback>
                      {msg.sender.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{msg.sender.name}</div>
                    <div className="text-sm">{msg.message}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </ScrollArea>
        <div className="border-t">
          <SendMessage thread={d.thread.thread_id}></SendMessage>
        </div>
      </div>
    </>
  );
}

function SendMessage({ thread }: { thread: string }) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  async function sendMessage() {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.sendMessge({
        body: { message: value, thread_id: thread },
      });
      if (res.status === 200) {
        setValue("");
        queryClient.invalidateQueries([`chat_thread_${thread}`]);
      } else {
        throw new Error((res.body as any).message);
      }
    } catch (err: any) {
      toast({ title: err.message || "Unknown error" });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex w-full p-1 items-center space-x-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your message"
      />
      <Button onClick={sendMessage} iconPlacement="right" Icon={Send}>
        Send {isLoading && <Loading></Loading>}
      </Button>
    </div>
  );
}
