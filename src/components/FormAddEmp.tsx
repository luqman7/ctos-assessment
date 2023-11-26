"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "../../store/useUserStore";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 5 characters.",
  }),
  salary: z.coerce
    .number({ invalid_type_error: "Salary must be a number without decimal" })
    .int()
    .positive({ message: "Salary must be more than 0" }),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number without decimal" })
    .int()
    .positive({ message: "Age must be more than 0" }),
  avatar: z.string().optional(),
});

export default function FormAddEmployee() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user } = useUserStore();
  const router = useRouter();

  const tab = useSearchParams();
  const defaultValues =
    tab.get("tab") === "add"
      ? { name: "", salary: 0, age: 0, avatar: "" }
      : {
          name: user?.first_name || "",
          salary: 3200 || 0,
          age: 27 || 0,
        };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (tab.get("tab") === "add") {
      try {
        const url = "https://reqres.in/api/users";
        await axios.post(url, values);
        toast({ description: "Sucessfully created" });
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/?tab=view");
      }
    } else {
      try {
        const url = `https://reqres.in/api/users/${user?.id}`;
        await axios.put(url, values);
        toast({ description: "Sucessfully updated" });
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/?tab=view");
      }
    }
  };

  const { toast } = useToast();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl border-gray-400 placeholder:text-gray-500"
                  placeholder="Enter employee name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl border-gray-400 placeholder:text-gray-500"
                  placeholder="Enter employee salary"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl border-gray-400 placeholder:text-gray-500"
                  placeholder="Enter employee age"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl border-gray-400 placeholder:text-gray-500"
                  placeholder="Enter employee age"
                  {...field}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button className="border border-gray-400 rounded-xl" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
