import { ScrollArea } from "@/components/ui/scroll-area";

import { DataTable, DataTableHandle } from "../../components/datatable-global";
import { UserTableData, columns } from "./data-table/columns";
import { apiQueryClient } from "@/api-client";
import { AddUser } from "./add-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

import { DataTableVisibleColumnSelector } from "@/components/datatable-visible-selector";
import { Loading } from "@/components/loading";

export function ManageUsersPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
        </div>
        <UsersList></UsersList>
      </div>
    </ScrollArea>
  );
}

function UsersList() {
  const ref = useRef<DataTableHandle<UserTableData>>(null);
  const { data, isLoading, error } =
    apiQueryClient.system_user.searchusers.useQuery(["system_users"], {
      query: { name_email: "" },
    });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was an error fetching users</AlertDescription>
      </Alert>
    );
  }

  const instance = ref.current?.tableInstance;

  return (
    <div>
      {instance && (
        <div className="flex w-full items-center justify-between py-4">
          <Input
            placeholder="Filter emails..."
            value={instance.getColumn("email")?.getFilterValue() as string}
            onChange={(event) =>
              instance.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-2 items-center">
            <DataTableVisibleColumnSelector table={instance} />
            <AddUser></AddUser>
          </div>
        </div>
      )}
      <DataTable
        ref={ref}
        columns={columns}
        data={data?.body?.data?.users || []}
      ></DataTable>
    </div>
  );
}
