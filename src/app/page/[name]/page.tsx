"use client";

import GetPublicPageDetails from "@/actions/getpublicpage";
import Links from "@/components/links";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/components/textarea.css";

export default function PublicLinkPage() {
  const [pageDetails, setPageDetails] = useState<any>();

  const params = useSearchParams();
  const pageid = params.get("id");
  const { name } = useParams();

  useEffect(() => {
    try {
      if (!pageid) {
        window.location.href = "/";
      } else {
        GetPublicPageDetails(Number(pageid)).then((res) => {
          if (res.error || !res.pagedetails) {
            window.location.href = "/";
          } else {
            const pageName = res.pagedetails.pagetitle
              .replace(/\s+/g, "-")
              .toLowerCase();
            if (name !== pageName) return (window.location.href = "/");
            setPageDetails({
              pagedetails: res.pagedetails,
              pagelinks: res.pagelinks,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="flex justify-center text-center items-center">
      {pageDetails ? (
        <div className="flex flex-col gap-y-2">
          <div
            dangerouslySetInnerHTML={{
              __html: pageDetails.pagedetails.pagetextcontent,
            }}
          />
          <div>
            <Links links={pageDetails.pagelinks} />
          </div>
        </div>
      ) : (
        <Loader2Icon className="animate-spin" />
      )}
    </div>
  );
}
