"use client";

import { Icons } from "@/components/icons";
import { RouteLayoutName } from "@/components/layout/route-layout";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contract } from "api-contract";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-input";
import { Paperclip } from "lucide-react";
import { apiClient } from "@/api-client";
import { OfferTableData, fetchUserOffers } from "@/app/actions/fetchOffers";
import { DataTable } from "@/components/datatable-global";
import { offerColumns } from "./data-table/columns";
export default function OffersPage() {
  const [data, setData] = useState<OfferTableData[]>([]);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const refetch = () => {
    setRefetchFlag(!refetchFlag);
  };
  const { toast } = useToast();
  async function fetchData() {
    try {
      const fetched_data = await fetchUserOffers();
      setData(fetched_data);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Couldn't fetch data",
        description: err.message,
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, [refetchFlag]);
  return (
    <>
      <div className="flex justify-between items-center">
        <RouteLayoutName>Offers</RouteLayoutName>
        <CreateOfferDialog refetch={refetch}></CreateOfferDialog>
      </div>
      <OffersTable data={data}></OffersTable>
    </>
  );
}
function OffersTable({ data }: { data: OfferTableData[] }) {
  return (
    <div className="">
      <DataTable columns={offerColumns} data={data}></DataTable>
    </div>
  );
}

function CreateOfferDialog({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  function setClose() {
    setOpen(false);
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="expandIcon"
            Icon={({ ...props }) => <Icons.userPlus size={16} {...props} />}
            iconPlacement="left"
          >
            Post New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-fit min-w-[760px] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Create new sell offer</DialogTitle>
            <DialogDescription>Create new sell offer!</DialogDescription>
          </DialogHeader>
          <AddSellOffer onCreate={refetch} setClose={setClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-screen">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create new Sell Offer</DrawerTitle>
          <DrawerDescription>Create new sell offer!</DrawerDescription>
        </DrawerHeader>
        <AddSellOffer
          onCreate={refetch}
          className="px-4 h-auto overflow-y-auto"
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddSellOffer({
  className,
  onCreate,
  setClose,
}: React.ComponentProps<"form"> & {
  onCreate?: () => void;
  setClose?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  type FormBodyType = {
    category: string;
    title: string;
    description: string;
    short_description: string;
    price: number | undefined;
    attachments: File;
  };

  const attachments = React.useMemo(() => {
    if (files?.at(0)) {
      return files.at(0);
    }
  }, [files]);

  const form = useForm<FormBodyType>({
    resolver: zodResolver(contract.marketplace.createOffer.body),
    defaultValues: {
      category: "",
      title: "",
      description: "",
      short_description: "",
      price: undefined,
      attachments: undefined,
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  async function handleSubmit(obj: FormBodyType) {
    console.log("hi");
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { category, description, short_description, title, price } = obj;
      const formData = new FormData();

      formData.append("category", category);
      formData.append("description", description);
      formData.append("short_description", short_description);
      formData.append("title", title);
      formData.append("price", price?.toString() || "");
      formData.append("attachments", attachments!);

      const response = await apiClient.marketplace.createOffer({
        body: formData,
      });

      if (response.status === 200) {
        if (onCreate) {
          onCreate();
        }
        queryClient.invalidateQueries({ queryKey: ["sell_offers"] });
        toast({
          title: "Offer Created",
        });
        if (setClose) {
          setClose();
        }
      } else {
        throw new Error(
          (response.body as any).message || (response.body as any).reason
        );
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Offer Creation Failed",
        description: err.message || "Unknown error. Check logs!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <ScrollArea className="max-h-full overflow-auto">
        <form
          className={cn(className, "h-full")}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FileUploaderTest state={[files, setFiles]}></FileUploaderTest>
          <div className="flex flex-wrap mt-2 items-start gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-60">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter offer's title" {...field}></Input>
                  </FormControl>
                  {form.formState.errors.title && (
                    <FormMessage>
                      {form.formState.errors.title.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="min-w-60 flex-1">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter offer's category"
                      {...field}
                    ></Input>
                  </FormControl>
                  {form.formState.errors.category && (
                    <FormMessage>
                      {form.formState.errors.category.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Price (in cents)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter offer's price"
                    {...field}
                  ></Input>
                </FormControl>
                {form.formState.errors && (
                  <FormMessage>
                    {form.formState.errors.description?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="flex flex-wrap mt-2 items-start gap-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1 basis-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter offer's description"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  {form.formState.errors && (
                    <FormMessage>
                      {form.formState.errors.description?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem className="min-w-60 flex-1">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter offer's short description"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  {form.formState.errors.short_description && (
                    <FormMessage>
                      {form.formState.errors.short_description.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="mt-2 gap-2 items-center flex flex-wrap">
            <Button
              type="submit"
              onClick={() => {
                console.log("hey");
              }}
              className="md:w-fit w-full"
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Offer
            </Button>
            <Button
              variant={"outline"}
              className="md:w-fit w-full"
              onClick={() => {
                form.clearErrors();
                form.reset();
                setFiles(null);
              }}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Form>
  );
}

const FileUploaderTest = ({
  state: [files, setFiles],
}: {
  state: [File[] | null, React.Dispatch<React.SetStateAction<File[] | null>>];
}) => {
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={{
        ...dropZoneConfig,
        accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif"] },
      }}
      className="relative bg-background rounded-lg p-2"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};
