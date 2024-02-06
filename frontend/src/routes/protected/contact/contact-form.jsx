import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAxiosIntercept from "@/hooks/useAxiosIntercept";

const contactSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email().min(1),
  phone_number: z.string().regex(new RegExp(/^08\d{9,12}$/), "Invalid number"),
});

export default function ContactForm({ isEditing, setIsEditing, editData }) {
  const apiPrivate = useAxiosIntercept();
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    // fill form when editData exists
    if (isEditing) form.reset(editData);
  }, [editData]);

  const onSubmit = async (contact) => {
    if (!isEditing) {
      const {
        data: { data },
        status,
      } = await apiPrivate.post("/api/contacts", contact);
    }
    if (isEditing) {
      const {
        data: { data },
        status,
      } = await apiPrivate.patch(`/api/contacts/${editData.id}`, contact);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Input your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Input your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Input your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="08123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEditing ? (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        ) : (
          <div className="flex gap-x-2">
            <Button type="submit" className="w-full">
              Edit Data
            </Button>
            <Button
              type="button"
              className="w-full border-2 border-zinc-950 bg-white text-zinc-950"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
