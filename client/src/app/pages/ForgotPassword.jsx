import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/useUser";
import { AlertCircleIcon } from "lucide-react";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { isPending, isError, error, mutate } = useForgotPassword();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email });
  };
  return (
    <Card className={"text-center"}>
      <CardTitle className={"text-xl"}>Forgot Password</CardTitle>
      <CardDescription>
        Enter your email below to send reset password link
      </CardDescription>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                required
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type={"email"}
                placeholder="me@example.com"
              />
              {isError && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertDescription>
                    {error?.response?.data?.message || "An error occurred."}
                  </AlertDescription>
                </Alert>
              )}
            </Field>
            <Button disabled={isPending} type="submit">
              {isPending ? "Sending" : "Send"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
