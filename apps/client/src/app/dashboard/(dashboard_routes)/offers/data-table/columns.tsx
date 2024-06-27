import { OfferTableData } from "@/app/actions/fetchOffers";
import { DataTableColumnHeader } from "@/components/datatable-column";
import { GetPublicUrl } from "@/shared/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DateFormat } from "common";
export const offerColumns: ColumnDef<OfferTableData>[] = [
  {
    accessorKey: "attachments",
    header: "Thumbnail",
    cell: ({ row }) => {
      const offer = row.original;
      return (
        <div>
          <img
            className="h-10 w-auto"
            src={GetPublicUrl(offer.attachments?.at(0) || "")}
          ></img>
        </div>
      );
    },
  },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Price" />;
    },
    enableSorting: true,
  },
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
