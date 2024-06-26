import { cookies } from "next/headers";
import { ChatLayout } from "./chat-layout";

export function ChatArea() {
  return (
    <div className="grid rounded grid-cols-[3fr_7fr] mt-2 h-[75dvh] border w-full">
      <div className="h-full border-r">{/** Sidebar */}</div>
      <div className="h-full grid grid-rows-[1fr_8fr_1fr]">
        <div className="border-b">{/** Chat Banner */}</div>
        <div className="">{/** Messages */}</div>
        <div className="border-t"></div>
      </div>
    </div>
  );
}
