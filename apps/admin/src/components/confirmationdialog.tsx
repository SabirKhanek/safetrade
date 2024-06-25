import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReloadingIcon } from "./reloadingicon";

export function ConfirmationDialog({
  onConfirm,
  open,
  setIsOpen,
  isLoading,
}: {
  onConfirm: () => void | Promise<void>;
  setIsOpen: any;
  isLoading: boolean;
  open: boolean;
}) {
  function handleClose() {
    if (setIsOpen) setIsOpen(false);
  }
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
          >
            Continue
            {isLoading && <ReloadingIcon></ReloadingIcon>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
