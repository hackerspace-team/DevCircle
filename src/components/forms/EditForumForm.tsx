"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Forum } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import {
  forumUpdateValidator,
  type ForumUpdatePayload,
} from "@/lib/validators/forum";
import { toast } from "@/hooks/useToast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Form";
import { Input } from "@/components/UI/Input";

import DeleteForum from "../Forum/DeleteForum";
import { Button } from "../UI/Button";

interface EditForumFormProps {
  forum: Forum;
}

const EditForumForm: React.FC<EditForumFormProps> = ({ forum }) => {
  const router = useRouter();
  const defaultValues: Partial<ForumUpdatePayload> = {
    forumId: forum.id,
    forumName: forum.name,
    description: forum.description ?? "",
  };
  const form = useForm<ForumUpdatePayload>({
    resolver: zodResolver(forumUpdateValidator),
    defaultValues,
    mode: "onChange",
  });
  const { mutate: updateForum, isLoading } = useMutation({
    mutationFn: async (payload: ForumUpdatePayload) => {
      await axios.patch("/api/forum", payload);
    },
    onError: async (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === StatusCodes.UNAUTHORIZED) {
          return router.push("/signin/?unauthorized=1");
        }
        if (error.response?.status === StatusCodes.CONFLICT) {
          return toast({
            title: "Forum already exists",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }
        if (error.response?.status === StatusCodes.BAD_REQUEST) {
          toast({
            title: "Invalid forum name",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "Something went wrong",
        description: "It's on us, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Forum Updated",
        description: "Your forum has been updated successfully.",
      });
      router.push(`/d/${forum.name}`);
    },
  });
  const onSubmit = (data: Omit<ForumUpdatePayload, "forumId">) =>
    updateForum({
      ...data,
      forumId: forum.id,
    });
  useEffect(() => {
    if (Object.keys(form.formState.errors).length) {
      for (const [, value] of Object.entries(form.formState.errors)) {
        toast({
          title: "Something went wrong",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [form.formState.errors]);
  return (
    <Form {...form}>
      <h1 className="pb-2 text-xl font-semibold">Edit your forum</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-4 md:pt-0 lg:max-w-2xl"
      >
        <FormField
          control={form.control}
          name="forumName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forum Name</FormLabel>
              <FormControl>
                <Input placeholder="forumName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                Forum/Community and description should atleast be 3 and 10
                characters respectively
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button type="submit" disabled={isLoading} isLoading={isLoading}>
            Update Forum
          </Button>
          <DeleteForum forumId={forum.id} forumName={forum.name} />
        </div>
      </form>
    </Form>
  );
};

export default EditForumForm;