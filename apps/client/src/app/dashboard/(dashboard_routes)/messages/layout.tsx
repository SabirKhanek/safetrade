"use client";
import { ChatArea } from "@/components/chat/chat-area";
import { RouteLayoutName } from "@/components/layout/route-layout";
import { PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ListStart } from "lucide-react";
import { apiQueryClient } from "@/react-query-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetPublicUrl } from "@/shared/utils";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/loading";
import { useQueryClient } from "@tanstack/react-query";

export default function MessagesPagLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  const { data, isLoading, error } = apiQueryClient.chat.getThreads.useQuery([
    "message_threads",
  ]);

  if (error || !data) {
    return (
      <Alert>
        <AlertTitle>There was an error fetching chat threads!</AlertTitle>
        <AlertDescription>Error fetching chat threads!</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <RouteLayoutName>Messages</RouteLayoutName>
      <div className="grid rounded grid-cols-[3fr_7fr] mt-2 h-[75dvh] border w-full">
        <ScrollArea className="h-full border-r">
          {/** Sidebar */}
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Messages</h2>
              <StartThreadPopover></StartThreadPopover>
            </div>

            {!isLoading ? (
              <ul className="flex mt-2 flex-col gap-2">
                {data!.body.map((d) => {
                  return (
                    <li className="" key={d.thread_id}>
                      <Link
                        href={`/dashboard/messages/${d.thread_id}`}
                        className="p-2 border flex items-center gap-2 overflow-hidden rounded-md py-2 hover:bg-accent "
                      >
                        <Avatar>
                          <AvatarImage
                            src={GetPublicUrl(d.other_user_avatar || "")}
                            alt="avatart"
                          />
                          <AvatarFallback>
                            {d.other_user_name.at(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <div>{d.other_user_name}</div>
                          {d.last_message && (
                            <span className="text-foreground/60">
                              {d.last_message?.message_content}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                }) || <></>}
              </ul>
            ) : (
              <div className="mt-2">
                <Loading></Loading>
              </div>
            )}
          </div>
          {/** End Sidebar */}
        </ScrollArea>

        {children}
      </div>
    </>
  );
}

function StartThreadPopover() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const client = useQueryClient();
  const { toast } = useToast();
  async function handleInitiate() {
    setIsLoading(true);
    try {
      const res = await apiClient.chat.initThread({
        body: { participant: value },
      });
      if (res.status === 200) {
        toast({ title: "Thread Created" });
        client.invalidateQueries(["message_threads"]);
      } else {
        throw new Error((res.body as any).message);
      }
    } catch (err: any) {
      toast({ title: err.message || "Unknow error" });
    } finally {
      setIsLoading(false);
      setValue("");
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="scale-75" size={"icon"} variant={"gooeyLeft"}>
          <ListStart></ListStart>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Start a new thread</h4>
          </div>
          <Input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Enter participant's email"
          />
          <Button onClick={handleInitiate}>
            Start {isLoading && <Loading></Loading>}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
