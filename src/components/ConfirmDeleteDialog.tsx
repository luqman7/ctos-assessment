import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "./ui/use-toast";
import axios from "axios";

interface IProps {
  id: number;
}

export default function ConfirmDeleteDialog({ id }: IProps) {
  const handleDelete = async (id: number) => {
    try {
      const url = `https://reqres.in/api/users/${id}`;
      await axios.delete(url);
      toast({ description: "Sucessfully deleted" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-400 text-white p-2.5 text-sm font-semibold rounded-xl">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete employee
            data and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
