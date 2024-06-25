import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { contract } from "api-contract";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Groups, Permissions, PermissionsType } from "common";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/file-input";
import { Paperclip } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";
import { Icons } from "@/components/icons";

export function AddUser({}: { onCreate?: () => void }) {
  const [open, setOpen] = React.useState(false);
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
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-fit min-w-[760px] overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
            <DialogDescription>
              Add new dashboard users. Their credentials will be sent to their
              email.
            </DialogDescription>
          </DialogHeader>
          <AddUserForm setClose={setClose} />
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
          <DrawerTitle>Add new user</DrawerTitle>
          <DrawerDescription>
            Add new dashboard users. Their credentials will be sent to their
            email.
          </DrawerDescription>
        </DrawerHeader>
        <AddUserForm className="px-4 h-auto overflow-y-auto" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddUserForm({
  className,
  onCreate,
  setClose,
}: React.ComponentProps<"form"> & {
  onCreate?: () => void;
  setClose?: () => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [files, setFiles] = React.useState<File[] | null>(null);
  type FormBodyType = {
    email: string;
    first_name: string;
    role_group: string;
    last_name: string;
    avatar?: File | undefined;
    permissions?: PermissionsType[] | undefined;
  };

  const avatar = React.useMemo(() => {
    if (files?.at(0)) {
      return files.at(0);
    }
  }, [files]);

  const form = useForm<FormBodyType>({
    resolver: zodResolver(contract.system_user.create.body),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      role_group: "",
      avatar: undefined,
    },
  });
  const [selectedPermissions, setSelectedPermissions] = React.useState<
    PermissionsType[]
  >([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  async function handleSubmit(obj: FormBodyType) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { email, first_name, last_name, role_group } = obj;
      const formData = new FormData();

      formData.append("email", email);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("role_group", JSON.stringify(role_group));
      formData.append("permissions", JSON.stringify(selectedPermissions));
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(contract.system_user.create.path, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const creationResult = await response.json();

      if (response.status === 200) {
        if (onCreate) {
          onCreate();
        }
        queryClient.invalidateQueries({ queryKey: ["system_users"] });
        toast({
          title: "User Created!",
          description: `User credentials were mailed to: ${email}`,
        });
        if (setClose) {
          setClose();
        }
      } else {
        throw new Error(creationResult.message || creationResult.reason);
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "User creation failed",
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
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-60">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter user's first name"
                      {...field}
                    ></Input>
                  </FormControl>
                  {form.formState.errors.first_name && (
                    <FormMessage>
                      {form.formState.errors.first_name.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="min-w-60 flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter user's lastname"
                      {...field}
                    ></Input>
                  </FormControl>
                  {form.formState.errors.last_name && (
                    <FormMessage>
                      {form.formState.errors.last_name.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap mt-2 items-start gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 min-w-60">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user's email" {...field}></Input>
                  </FormControl>
                  {form.formState.errors.email && (
                    <FormMessage>
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role_group"
              render={({ field }) => (
                <FormItem className="min-w-60 flex-1">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user's role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Groups).map((v) => (
                        <SelectItem value={v} key={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.role_group && (
                    <FormMessage>
                      {form.formState.errors.role_group.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="my-4 flex w-full flex-wrap gap-3">
            <ScrollArea className="h-[30dvh] flex-1">
              <div className="min-w-44 rounded border border-border h-full p-2 min-h-[30dvh]">
                <h2 className="font-medium">Available Permissions</h2>
                <ul className="flex flex-col gap-2 mt-3">
                  {Object.values(Permissions)
                    .filter((v) => !selectedPermissions.includes(v))
                    .map((v) => (
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => {
                          setSelectedPermissions((prev) => [...prev, v]);
                        }}
                        className="w-full "
                        key={v}
                      >
                        {v}
                      </Button>
                    ))}
                </ul>
              </div>
            </ScrollArea>
            <ScrollArea className="h-[30dvh] flex-1">
              <div className="min-w-44 rounded border border-border h-full p-2 min-h-[30dvh]">
                <h2 className="font-medium">Selected Permissions</h2>
                <ul className="flex flex-col gap-2 mt-3">
                  {selectedPermissions.map((v) => (
                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={() => {
                        setSelectedPermissions((prev) => {
                          const indexToDelete = prev.indexOf(v);
                          if (indexToDelete === -1) return prev;
                          prev.splice(indexToDelete, 1);
                          return [...prev];
                        });
                      }}
                      className="w-full "
                      key={v}
                    >
                      {v}
                    </Button>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          </div>

          <div className="mt-2 gap-2 items-center flex flex-wrap">
            <Button
              type="submit"
              className="md:w-fit w-full"
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create User
            </Button>
            <Button
              variant={"outline"}
              className="md:w-fit w-full"
              onClick={() => {
                form.clearErrors();
                form.reset();
                setFiles(null);
                setSelectedPermissions(() => []);
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
