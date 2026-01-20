import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useAuth";
import { useEditProfile } from "@/hooks/useUser";
import { editUser } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const EditProfile = () => {
  const { data } = useProfile();
  const user = data?.user;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editUser),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: null,
    },
  });
  const avatar = useWatch({ control, name: "avatar" });
  const [preview, setPreview] = useState(user?.avatar?.url || "/logo.png");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      setPreview(URL.createObjectURL(avatar[0]));
    }
  }, [avatar]);
  const { isPending, mutate, isError, error } = useEditProfile();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);
    mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold">Edit Profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <FieldGroup>
          <Field orientation="horizontal">
            <Avatar className={"w-16 h-16"}>
              <AvatarImage src={preview} />
            </Avatar>

            <Field data-invalid={!!errors?.avatar}>
              <Label htmlFor="">Change Photo</Label>
              <Input
                {...register("avatar")}
                type={"file"}
                name="avatar"
                aria-invalid={!!errors?.avatar}
                accept="image/*"
                className={"mt-1"}
              />
              <FieldError>{errors?.avatar?.message}</FieldError>
            </Field>
          </Field>
          <Field data-invalid={!!errors?.name}>
            <Label htmlFor="name">Name</Label>
            <Input
              aria-invalid={!!errors?.name}
              type="text"
              id="name"
              name="name"
              {...register("name")}
              required
            />
            <FieldError>{errors?.name?.message}</FieldError>
          </Field>
          <Field data-invalid={!!errors?.email}>
            <Label htmlFor="email">Email</Label>
            <Input
              aria-invalid={!!errors?.email}
              type="email"
              id="name"
              name="email"
              {...register("email")}
              required
            />
            <FieldError>{errors?.email?.message}</FieldError>
          </Field>
          {isError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>
                {error?.response?.data?.message || "An error occurred."}
              </AlertDescription>
            </Alert>
          )}
          <Button disabled={isPending} type="submit">
            {isPending ? "Editing...." : "Edit Profile"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default EditProfile;
