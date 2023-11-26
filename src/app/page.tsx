"use client";

import FormAddEmployee from "@/components/FormAddEmp";
import ListEmployee from "@/components/ListEmployee";
import Tabs from "@/components/Tabs";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "../../store/useUserStore";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const tab = useSearchParams();
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (tab.get("tab") === "edit" && user === null) {
      console.log(user);
      toast({
        variant: "destructive",
        description: "Please select an employee to edit",
      });
      router.push("/?tab=view");
    } else if (!tab.get("tab")) {
      router.push("/?tab=add");
    }

    return () => {};
  }, [router, tab, user]);

  return (
    <main className="flex min-h-screen flex-col items-center p-3 lg:p-24">
      <Tabs />

      <div className="bg-slate-200 w-full mt-5 rounded-xl p-5">
        {tab.get("tab") === "add" && <FormAddEmployee />}

        {tab.get("tab") === "edit" && <FormAddEmployee />}

        {tab.get("tab") === "view" && <ListEmployee />}
      </div>
    </main>
  );
}
