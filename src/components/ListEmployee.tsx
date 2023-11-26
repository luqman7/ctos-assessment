import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import useUserStore from "../../store/useUserStore";

export default function ListEmployee() {
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data: employeeList, error } = useSWR(
    "https://reqres.in/api/users?per_page=20",
    fetcher
  );

  if (error) {
    console.error(error);
  }

  const router = useRouter();
  const { fetchUser } = useUserStore();
  const getSingleUser = async (userId: number) => {
    try {
      await fetchUser(userId);
      router.push("/?tab=edit");
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleEdit = async (userId: number) => {
    try {
      await getSingleUser(userId);
    } catch (error) {
      console.error("Error handling edit button click:", error);
    }
  };

  return (
    <div>
      {employeeList ? (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
          {employeeList.data.map((employee: any) => {
            const truncatedName =
              employee.first_name.length > 25
                ? `${employee.first_name.substring(0, 25)}...`
                : employee.first_name;

            return (
              <div
                className="bg-slate-300 hover:bg-slate-100 rounded-xl h-[400px] flex flex-col items-center justify-center space-y-4 p-10"
                key={employee.id}
              >
                <Image
                  className="rounded-full"
                  alt=""
                  width={150}
                  height={150}
                  src={employee.avatar}
                />
                <p className="text-gray-500 text-xs">{employee.email}</p>
                <p>{truncatedName}</p>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="secondary"
                    className="bg-blue-300 hover:bg-blue-500 rounded-xl text-white"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </Button>
                  <ConfirmDeleteDialog id={employee.id} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
