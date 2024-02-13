"use client";

import CreatePage from "@/actions/createpage";
import FormError from "@/components/formerror";
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

export default function CreatePageCard(props: { userid: number }) {
  const [error, setError] = useState<string>();
  return (
    <Card className="dark:bg-[#0f0f0f] dark:text-white dark:border-black">
      <CardHeader>
        <CardTitle>Create New Page</CardTitle>
        <CardDescription>
          Create a new page for everyone to see!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-y-5 h-36"
          action={(data) => {
            try {
              CreatePage(data).then((res) => {
                if (res.error) {
                  setError(res.error);
                } else {
                  window.location.href = `/document/${res.pageid}`;
                }
              });
            } catch (error) {
              setError("Unexpected error while creating server");
              console.error(error);
            }
          }}
        >
          <div>
            <Label>Page Title</Label>
            <Input type="text" name="pagetitle" />
          </div>

          <Input type="hidden" name="userid" value={props.userid} />

          {error && <FormError message={error} />}

          <Button type="submit">Create</Button>
        </form>
      </CardContent>
    </Card>
  );
}
