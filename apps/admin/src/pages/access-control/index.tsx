import { apiClient, apiQueryClient } from "@/api-client";
import { ErrorAlert } from "@/components/alert-error";
import {
  RouteLayout,
  RouteLayoutHeading,
  RouteLayoutName,
} from "@/components/layout/route-layout";
import { Loading } from "@/components/loading";
import { ReloadingIcon } from "@/components/reloadingicon";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Groups, GroupsType, Permissions, PermissionsType } from "common";
import { isEqual, sortBy } from "lodash";
import { Dispatch, useEffect, useMemo, useState } from "react";

export function AccessControlPage() {
  const [selectedRole, setSelectedRole] = useState<GroupsType>(
    Groups.RootGroup
  );
  const [givenPermissions, setGivenPermissions] = useState<PermissionsType[]>(
    []
  );
  const { data, isLoading, error } =
    apiQueryClient.accessctrl.getGroupsPermission.useQuery(
      ["group_permissions"],
      {},
      {
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  const client = useQueryClient();

  const currentGroup = useMemo(() => {
    return data?.body.groups.find((v) => v.group_name === selectedRole);
  }, [data, selectedRole]);

  const notGivenPermissions = useMemo(() => {
    return Object.values(Permissions).filter(
      (v) => !givenPermissions.includes(v)
    );
  }, [givenPermissions]);

  const isOutOfSync = useMemo(() => {
    const sortedGivenPermissions = sortBy(givenPermissions);
    const sortedCurrentPermissions = sortBy(currentGroup?.permissions || []);
    const isout = !isEqual(sortedGivenPermissions, sortedCurrentPermissions);
    console.log({
      isOutOfSync: isout,
      givenPermissions: sortedGivenPermissions,
      current: sortedCurrentPermissions,
    });
    return isout;
  }, [givenPermissions, currentGroup]);

  const { toast } = useToast();
  const updatePermissionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.accessctrl.updatePermissionsInGroup({
        body: { group: selectedRole, permissions: givenPermissions },
      });
      if (res.status !== 200) {
        throw new Error((res.body as any).message || (res.body as any).reason);
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Permissions updated successfully",
      });
      client.invalidateQueries(["group_permissions"]);
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: `Couldn't update permissions: ${err.message || "Unexpected error"}`,
      });
    },
  });

  useEffect(() => {
    if (Object.values(Groups).includes(selectedRole)) {
      setGivenPermissions(currentGroup?.permissions || []);
    }
  }, [data, selectedRole]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorAlert />;
  }
  return (
    <RouteLayout>
      <RouteLayoutHeading>
        <RouteLayoutName>Manage Role Permissions</RouteLayoutName>
        {isOutOfSync && (
          <Button
            onClick={() => updatePermissionMutation.mutate()}
            variant={"gooeyRight"}
          >
            {updatePermissionMutation.isLoading && <ReloadingIcon />}
            Save
          </Button>
        )}
      </RouteLayoutHeading>
      <div>
        <SelectRoleGroup value={selectedRole} setValue={setSelectedRole} />
        <div className="my-4 flex w-full flex-wrap gap-3">
          <ScrollArea className="h-[70dvh] flex-1">
            <div className="min-w-44 rounded border border-border flex flex-col h-full p-2 min-h-[70dvh]">
              <h2 className="font-medium">Available Permissions</h2>
              {notGivenPermissions.length > 0 ? (
                <ul className="flex flex-col grow gap-2 mt-3">
                  {notGivenPermissions.map((v) => (
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={() =>
                        setGivenPermissions((prev) => [...prev, v])
                      }
                      className="w-full "
                      key={v}
                    >
                      {v}
                    </Button>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center grow">
                  <h3 className="">Nothing Here!</h3>
                </div>
              )}
            </div>
          </ScrollArea>
          <ScrollArea className="h-[70dvh] flex-1">
            <div className="min-w-44 rounded border flex flex-col border-border h-full p-2 min-h-[70dvh]">
              <h2 className="font-medium">Authorized Permissions</h2>
              {givenPermissions.length > 0 ? (
                <ul className="flex flex-col grow gap-2 mt-3">
                  {givenPermissions.map((v) => (
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() =>
                        setGivenPermissions((prev) =>
                          prev.filter((perm) => perm !== v)
                        )
                      }
                      className="w-full "
                      key={v}
                    >
                      {v}
                    </Button>
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center items-center grow">
                  <h3 className="">Nothing Here!</h3>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </RouteLayout>
  );
}

function SelectRoleGroup({
  value,
  setValue,
}: {
  value?: GroupsType;
  setValue?: Dispatch<GroupsType>;
}) {
  return (
    <Select
      onValueChange={(v) => setValue && setValue(v as GroupsType)}
      value={value}
    >
      <SelectTrigger className="max-w-lg">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role Groups</SelectLabel>
          {Object.values(Groups).map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
