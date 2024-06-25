import { DataTable, DataTableHandle } from "@/components/datatable-global";
import {
  RouteLayout,
  RouteLayoutHeading,
  RouteLayoutName,
} from "@/components/layout/route-layout";
import { Dispatch, useEffect, useRef, useState } from "react";
import { AuditTableData, auditColumns } from "./data-table/columns";

import { useSearchParams } from "react-router-dom";
import { DataTableVisibleColumnSelector } from "@/components/datatable-visible-selector";
import { Input } from "@/components/ui/input";
import { Tag, TagInput } from "emblor";
import { apiClient } from "@/api-client";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReloadIcon } from "@radix-ui/react-icons";
import { debounce } from "lodash";
export function AuditLogsPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollArea className="h-full">
      <RouteLayout>
        <RouteLayoutHeading>
          <RouteLayoutName>
            <span className="inline-flex items-center gap-3">
              Audit Logs Trail{" "}
              {isLoading && (
                <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
              )}
            </span>
          </RouteLayoutName>
        </RouteLayoutHeading>
        <AuditList isListLoading={isLoading} setIsListLoading={setIsLoading} />
      </RouteLayout>
    </ScrollArea>
  );
}
function AuditList({
  isListLoading: isLoading,
  setIsListLoading: setIsLoading,
}: {
  isListLoading: boolean;
  setIsListLoading: Dispatch<boolean>;
}) {
  const ref = useRef<DataTableHandle<AuditTableData>>(null);
  const instance = ref.current?.tableInstance;
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [auditIdTags, setAuditIdTags] = useState<Tag[]>([]);
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [data, setData] = useState<AuditTableData[]>([]);
  const [dataFilter, setDataFilter] = useState<{ name_email: string }>({
    name_email: searchParams.get("user") || "",
  });

  useEffect(() => {
    console.log("mounted");
    fetchTrailData();
  }, []);

  useEffect(() => {
    const tagsFromUrl = searchParams.get("audit_ids");
    if (tagsFromUrl) {
      setAuditIdTags(
        tagsFromUrl.split(",").map((tag) => ({ id: tag, text: tag }))
      );
    }
    fetchTrailDataDebounced();
  }, [searchParams]);

  useEffect(() => {
    const params: any = {};
    if (dataFilter.name_email) {
      params.user = dataFilter.name_email;
    }
    if (auditIdTags.length > 0) {
      params.audit_ids = auditIdTags.map((tag) => tag.text).join(",");
    }
    setSearchParams(params);
  }, [dataFilter, auditIdTags]);

  const fetchTrailData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const trail_ids = new Set(auditIdTags.map((v) => v.text));
    try {
      const res = await apiClient.audit.getTrailDetails({
        query: {
          user_email:
            dataFilter.name_email.length > 0
              ? dataFilter.name_email
              : undefined,
          trail_ids: Array.from(trail_ids),
          take: 10000,
        },
      });
      if (res.status === 200) {
        setData(res.body.data);
      } else {
        throw new Error((res.body as any).message || (res.body as any).reason);
      }
    } catch (err: any) {
      toast({
        title: "Query Trail Data",
        description: err.message || "Unexpected error occurred!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const fetchTrailDataDebounced = debounce(fetchTrailData, 1000);

  return (
    <div>
      <div className="flex w-full flex-wrap items-start justify-between py-4">
        <div className="grow ">
          <Input
            name="name_email"
            placeholder="Filter emails..."
            value={dataFilter.name_email}
            onChange={(event) =>
              setDataFilter((prev) => {
                return { ...prev, [event.target.name]: event.target.value };
              })
            }
            className="max-w-lg min-w-[250px]"
          />
          <div className="max-w-lg my-2">
            <TagInput
              tags={auditIdTags}
              setTags={(newTags) => {
                setAuditIdTags(newTags);
              }}
              placeholder={
                auditIdTags.length > 0
                  ? `${auditIdTags.length} id filters are applied!`
                  : "Filter by trail_ids"
              }
              className="bg-accent/40 min-w-[250px]"
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
              inlineTags={false}
              clearAll={true}
              truncate={5}
            />
          </div>
        </div>
        {instance && (
          <div className="flex gap-2 items-center">
            <DataTableVisibleColumnSelector table={instance} />
          </div>
        )}
      </div>

      <DataTable ref={ref} columns={auditColumns} data={data}></DataTable>
    </div>
  );
}
