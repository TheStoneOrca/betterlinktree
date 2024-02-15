"use client";

import UnPublishPage from "@/actions/unpublish";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function UnPublishButton(props: { documentid: number }) {
  return (
    <div>
      <form
        action={(data) => {
          try {
            UnPublishPage(data).then((res) => {
              if (res.error) {
                console.error(res.error);
              }
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Input type="hidden" value={props.documentid} name="pageid" />
        <Button type="submit">Unpublish</Button>
      </form>
    </div>
  );
}
