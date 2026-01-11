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
import { loginSchema } from "@/schemas/auth.schema";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin, useProfile } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import auth from "@/apis/auth";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { isError, isPending, mutate, error } = useLogin();
  const { data: user, isLoading } = useProfile();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const onSubmit = (userData) => {
    mutate(userData);
  };
  if (isLoading) return null;
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className={"text-center"}>
          <CardTitle className={"text-xl"}>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  type={"email"}
                  placeholder="me@example.com"
                  required
                />
                <FieldError>{errors?.email?.message}</FieldError>
              </Field>
              <Field data-invalid={!!errors.password}>
                <div className="flex items-center">
                  <FieldLabel>Password</FieldLabel>
                  <Link className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  type={"password"}
                  required
                />
                <FieldError>{errors?.password?.message}</FieldError>
              </Field>
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Spinner />
                      Logging
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
