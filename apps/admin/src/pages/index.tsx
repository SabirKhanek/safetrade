// import { apiClient } from "../api-client";
import { ScrollArea } from "@/components/ui/scroll-area";


export function HomePage() {
  // const { data, isLoading } = apiClient.user.getAll.useQuery(["users"]);
  // if (isLoading) return <p>Loading...</p>;
  // return (
  //   <ul>
  //     {data?.body.map((u) => <div className="text-red-500">{u.username}</div>)}
  //   </ul>
  // );
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
      </div>
    </ScrollArea>
  );
}
