import PageTitle from "@/components/common/PageTitle";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRegister } from "@/hooks/useAuth";
import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const avatar = useWatch({ control, name: "avatar" });
  const { isPending, mutate, isError, error } = useRegister();

  const onSubmit = (data) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("avatar", data.avatar[0]);
    mutate(form);
  };

  return (
    <>
      <PageTitle title={"Register"} />
      <div className=" flex flex-col ">
        <Card>
          <CardHeader className={" text-center"}>
            <CardTitle className={"text-xl"}>Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
            {isError && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription>
                  {error?.response?.data?.message || "An error occurred."}
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent className={""}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <FieldGroup>
                <Field data-invalid={!!errors?.name}>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    {...register("name")}
                    aria-invalid={!!errors?.name}
                    type={"text"}
                    placeholder="Anish karki"
                    required
                  />
                  <FieldError>{errors?.name?.message}</FieldError>
                </Field>
                <Field data-invalid={!!errors?.email}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...register("email")}
                    type={"email"}
                    aria-invalid={!!errors?.email}
                    placeholder="me@example.com"
                    required
                  />
                  <FieldError>{errors?.email?.message}</FieldError>
                </Field>
                <Field>
                  <Field className={"grid grid-cols-2 gap-4"}>
                    <Field data-invalid={!!errors?.password}>
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        {...register("password")}
                        aria-invalid={!!errors?.password}
                        type={"password"}
                        required
                      />
                    </Field>
                    <Field data-invalid={!!errors?.confirmPassword}>
                      <FieldLabel>Confirm password</FieldLabel>
                      <Input
                        {...register("confirmPassword")}
                        aria-invalid={!!errors?.confirmPassword}
                        type={"password"}
                        required
                      />
                    </Field>
                  </Field>
                  <FieldError>{errors?.password?.message}</FieldError>
                  <FieldError className={"text-right"}>
                    {errors?.confirmPassword?.message}
                  </FieldError>
                </Field>
                <Field data-invalid={!!errors?.avatar} orientation="horizontal">
                  <Input
                    aria-invalid={!!errors?.avatar}
                    {...register("avatar")}
                    type={"file"}
                  />
                  <Avatar>
                    <AvatarImage
                      src={
                        avatar?.[0]
                          ? URL.createObjectURL(avatar[0])
                          : "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Field>
                <FieldError className={"text-center"}>
                  {errors?.avatar?.message}
                </FieldError>
                <Field>
                  <Button disabled={isPending} type="submit">
                    {isPending ? (
                      <>
                        <Spinner />
                        Creating
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <FieldDescription className={"text-center"}>
                    Already have an account? <Link to="/login">Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className={"px-6 text-center"}>
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <Link to="#">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </>
  );
};

export default Register;
