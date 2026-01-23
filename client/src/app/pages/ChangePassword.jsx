import PageTitle from "@/components/common/PageTitle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "@/hooks/useUser";
import { editPassword } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPassword),
  });
  const { isError, error, mutate, isPending } = useChangePassword();
  const onSubmit = (data) => {
    mutate({ oldPassword: data.oldPassword, newPassword: data.newPassword });
  };
  return (
    <>
      <PageTitle title={"Change Password"} />
      <Card
        className={
          "max-w-sm w-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
        }
      >
        <CardHeader className={"text-center text-xl"}>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.oldPassword}>
                <Label>Old Password</Label>
                <Input
                  aria-invalid={!!errors?.oldPassword}
                  name="oldPassword"
                  {...register("oldPassword")}
                  type={"password"}
                />
                <FieldError>{errors?.oldPassword?.message}</FieldError>
              </Field>
              <Field data-invalid={!!errors.newPassword}>
                <Label>New Password</Label>
                <Input
                  aria-invalid={!!errors?.newPassword}
                  name="newPassword"
                  {...register("newPassword")}
                  type={"password"}
                />
                <FieldError>{errors?.newPassword?.message}</FieldError>
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <Label>Confirm Password</Label>
                <Input
                  aria-invalid={!!errors?.confirmPassword}
                  name="confirmPassword"
                  {...register("confirmPassword")}
                  type={"password"}
                />
                <FieldError>{errors?.confirmPassword?.message}</FieldError>
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
                {isPending ? "Changing Password..." : "Change Password"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
