import { WalletActivityResult } from "@/app/actions/wallet";
import { DataTableColumnHeader } from "@/components/datatable-column";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { schema } from "db-schema";
import { InferSelectModel } from "drizzle-orm";
import { DateFormat } from "common";
export const activityColumns: ColumnDef<
  InferSelectModel<typeof schema.wallet_activity>
>[] = [
  {
    accessorKey: "activity_id",
    header: "Activity Id",
  },
  { accessorKey: "activity_subject", header: "Subject" },

  { accessorKey: "amount", header: "Amount (cents)" },
  { accessorKey: "activity_type", header: "Activity Type" },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    enableSorting: true,
    cell: ({ row }) => {
      const val =
        row.getValue("created_at") &&
        format(
          new Date(row.getValue("created_at")),
          DateFormat.DD_MON_YYYY_HH_MM_AMPM
        );
      return val;
    },
  },
];
