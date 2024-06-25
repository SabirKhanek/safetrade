import { DataTableColumnHeader } from "@/components/datatable-column";
import { ColumnDef } from "@tanstack/react-table";
import { ClientInferResponseBody } from "@ts-rest/core";
import { contract } from "api-contract";
import { format } from "date-fns";
import { DateFormat, Permissions } from "common";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from "@/components/providers/authstate-provider";
import { GetPublicUrl } from "@/shared/utils";

export type AuditTableData = ClientInferResponseBody<
  typeof contract.audit.getTrailDetails,
  200
>["data"][number];

export const auditColumns: ColumnDef<AuditTableData>[] = [
  {
    accessorKey: "action_name",
    header: "Action Performed",
  },
  {
    accessorKey: "performer",
    header: "Performed By",
    cell: ({ row }) => {
      const performer = row.original.performer;
      const authState = useAuthState();
      return (
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  {performer.avatar && (
                    <AvatarImage
                      src={GetPublicUrl(performer.avatar)}
                      alt={performer.first_name}
                    ></AvatarImage>
                  )}
                  <AvatarFallback>{performer.first_name.at(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {performer.first_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {performer.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  disabled={
                    !authState.hasPermission(Permissions.ReadAuditTrails)
                  }
                >
                  View Audit Logs
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {performer.email}
        </div>
      );
    },
  },
  {
    accessorKey: "performed_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Performed At" />;
    },
    cell: ({ row }) => {
      const val =
        row.getValue("performed_at") &&
        format(
          new Date(row.getValue("performed_at")),
          DateFormat.DD_MON_YYYY_HH_MM_AMPM
        );
      return val;
    },
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const val = row.original.metadata;
      if (
        typeof val === "object" &&
        val !== null &&
        Object.keys(val).length > 0
      ) {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View JSON</Button>
            </DialogTrigger>
            <DialogContent className="min-w-fit">
              <DialogHeader>
                <DialogTitle>Action Metadata</DialogTitle>
                <DialogDescription>
                  Runtime information collected during action execution.
                </DialogDescription>
              </DialogHeader>
              <pre className="bg-accent/40 p-4 text-white rounded-[0.5rem]">
                {JSON.stringify(val, null, 3)}
              </pre>
            </DialogContent>
          </Dialog>
        );
      }
    },
  },
];
