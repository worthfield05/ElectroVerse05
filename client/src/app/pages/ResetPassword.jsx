import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/useUser";
import { AlertCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router";

const ResetPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    errors: "",
  });

  const { token } = useParams();
  const { isPending, isError, error, mutate } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setValues({ ...values, errors: "Password not match" });
      return;
    } else {
      mutate({
        credential: {
          password: values.password,
        },
        token,
      });
    }
    setValues({ password: "", confirmPassword: "", errors: "" });
  }
  return (
    <Card className={"text-center"}>
      <CardTitle className={"text-xl"}>Reset Password</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <Input
                required
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                name="password"
                type={"password"}
              />
            </Field>
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                required
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
                }
                type={"password"}
              />
              <FieldError>{values.errors && values.errors}</FieldError>
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
              {isPending ? "Resetting Password..." : "Reset Password"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
