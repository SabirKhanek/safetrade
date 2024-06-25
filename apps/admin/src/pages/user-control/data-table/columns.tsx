import { apiClient } from "@/api-client";
import { Routes } from "@/app.routes";
import { ConfirmationDialog } from "@/components/confirmationdialog";
import { DataTableColumnHeader } from "@/components/datatable-column";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuAuditLogNav,
} from "@/components/ui/dropdown-menu";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ClientInferResponseBody } from "@ts-rest/core";
import { contract } from "api-contract";
import { DateFormat, GetPublicUrl } from "common";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export type UserTableData = ClientInferResponseBody<
  typeof contract.system_user.searchusers,
  200
>["data"]["users"][0];
export const columns: ColumnDef<UserTableData>[] = [
  {
    accessorKey: "avatar",
    header: () => <></>,
    cell: ({ row }) => {
      const url =
        row.getValue<UserTableData["avatar"]>("avatar") &&
        GetPublicUrl(row.getValue("avatar"));
      return (
        <Avatar className="h-8 w-8">
          {url && <AvatarImage src={url} alt={row.getValue("first_name")} />}
          <AvatarFallback>
            {row.getValue<string>("first_name")?.at(0) || "A"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="First Name" />;
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Last Name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "joined_on",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Joined on" />;
    },
    cell: ({ row }) => {
      const val =
        row.getValue("joined_on") &&
        format(
          new Date(row.getValue("joined_on")),
          DateFormat.DD_MON_YYYY_HH_MM_AMPM
        );
      return val;
    },
  },
  {
    accessorKey: "creator",
    header: "Created By",
    cell: ({ row }) => {
      const creator = row.original.creator;
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {creator?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {creator?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigate(Routes.AuditLogs + `?user=${creator.email}`);
                }}
              >
                View Audit Logs
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const navigate = useNavigate();
      const [isOpen, setIsOpen] = useState(false);
      const { toast } = useToast();
      const [isUserDeleting, setIsUserDeleting] = useState(false);
      const queryClient = useQueryClient();
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(user.email);
                }}
              >
                Copy Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuAuditLogNav>View Audit Logs</DropdownMenuAuditLogNav>
              <DropdownMenuItem onClick={() => setIsOpen(true)} className="">
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ConfirmationDialog
            isLoading={isUserDeleting}
            setIsOpen={setIsOpen}
            open={isOpen}
            onConfirm={async () => {
              if (isUserDeleting) return;
              setIsUserDeleting(true);
              try {
                const res = await apiClient.system_user.remove({
                  params: { userId: user.email },
                });
                if (res.status === 200) {
                  if (res.body.deleted) {
                    queryClient.invalidateQueries({
                      queryKey: ["system_users"],
                    });

                    toast({
                      title: "User deleted",
                      description: "User was deleted!",
                      action: (
                        <ToastAction
                          onClick={() => {
                            navigate(
                              Routes.AuditLogs +
                                `?audit_ids=${res.body.audit_log}`
                            );
                          }}
                          altText="View in audit logs"
                        >
                          View in Logs
                        </ToastAction>
                      ),
                    });
                  }
                } else {
                  throw new Error(
                    (res.body as any).message || (res.body as any).reason
                  );
                }
              } catch (err: any) {
                toast({
                  title: "Action failed",
                  description: `Couldn't delete user: ${err.message || "Unknown reason"}`,
                });
              } finally {
                setIsUserDeleting(false);
                setIsOpen(false);
              }
            }}
          />
        </>
      );
    },
  },
];
