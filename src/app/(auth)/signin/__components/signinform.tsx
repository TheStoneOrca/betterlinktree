"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye } from "lucide-react";
import FormError from "@/components/formerror";
import ReactSecureStorage from "react-secure-storage";
import SignIn from "@/actions/signin";
import FormRedirect from "@/components/formhref";

export default function SignInForm() {
  const [password, setPassword] = useState<string>();
  const [isShowingPass, setShowingPass] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  return (
    <Card className="w-96 dark:bg-[#0f0f0f] dark:text-white dark:border-black">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Gain Access To The Next LinkWeb!</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-3 h-96"
          action={(data) => {
            try {
              SignIn(data).then((res) => {
                if (res.error) {
                  setError(res.error as string);
                } else {
                  ReactSecureStorage.setItem(
                    "user_session",
                    res.userJWT as string
                  );
                  window.location.href = "/";
                }
              });
            } catch (error) {
              console.error(error);
              setError("Unexpected Server Error!");
            }
          }}
        >
          <div>
            <Label>Username or Email</Label>
            <Input type="text" name="username" required />
          </div>

          <div>
            <Label>Password</Label>
            <div className="flex">
              {isShowingPass ? (
                <Input
                  minLength={8}
                  type="text"
                  name="password"
                  onInput={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                  value={password}
                  required
                />
              ) : (
                <Input
                  minLength={8}
                  type="password"
                  name="password"
                  onInput={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                  value={password}
                  required
                />
              )}
              <Button
                type="button"
                onClick={() => {
                  setShowingPass(!isShowingPass);
                }}
              >
                <Eye />
              </Button>
            </div>
          </div>
          {error && <FormError message={error} />}

          <Button type="submit">Sign In</Button>

          <br />

          <FormRedirect type="login" />
        </form>
      </CardContent>
    </Card>
  );
}
