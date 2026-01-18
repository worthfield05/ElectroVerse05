import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUser, useUserDetail } from "@/hooks/useAdmin";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "sonner";

const UpdateUser = () => {
  const { id } = useParams();
  const { isLoading, data } = useUserDetail(id);
  const { isPending, isError, mutate } = useUpdateUser();
  const user = data?.user;
  const { control, register, handleSubmit, reset } = useForm();

  const [roleValue, setRoleValue] = useState("user");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
      setRoleValue(user.role || "user");
    }
  }, [user, reset]);

  function onSubmit(newRole) {
    mutate({ id: user._id, role: newRole.role || roleValue });
  }
  console.log(user);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-4 bg-white rounded-lg shadow-md"
    >
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="role">Role</Label>
        <Controller
          control={control}
          name="role"
          defaultValue={roleValue}
          render={({ field }) => (
            <Select
              onValueChange={(val) => {
                field.onChange(val);
                setRoleValue(val);
              }}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Updating..." : "Update User"}
      </Button>
    </form>
  );
};

export default UpdateUser;
