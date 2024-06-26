import { ExitIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { contract } from "api-contract";
import { apiClient } from "@/api-client";
import { toast, useToast } from "./ui/use-toast";

export function LogoutButton() {
  const { toast } = useToast();
  return (
    <Button asChild variant="outline" size="icon">
      <a
        onClick={async () => {
          const res = await apiClient.system_auth.logout();
          if (res.status === 200) {
            toast({ title: "Logout", description: "Hope to see you again!" });
            window.location.reload();
          }
        }}
        href={contract.auth.logout.path}
      >
        <ExitIcon className="h-4 w-4" />
      </a>
    </Button>
  );
}

export async function Logout() {
  const res = await apiClient.system_auth.logout();
  if (res.status === 200) {
    toast({ title: "Logout", description: "Hope to see you again!" });
    window.location.reload();
  }
}
