"use client";

import GetPageDetails from "@/actions/getpagedetails";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocumentPageHeader from "./__components/header";
import DocumentTextArea from "./__components/textarea";
import Links from "../../../../components/links";
import CreateNewLinkForm from "./__components/newlinkform";
import NewLinkButton from "./__components/newlinkbtn";
import PublishButton from "./__components/publishbtn";

const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function DocumentPage() {
  const [page, setPage] = useState<{
    pagedetails: any;
    pagelinks: Array<any>;
  }>();
  const [newLink, showNewLink] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    GetPageDetails(Number(id) as any).then((res) => {
      if (res.error) {
        window.location.href = "/";
      } else if (res.pagedetails && res.pagelinks) {
        setPage({ pagedetails: res.pagedetails, pagelinks: res.pagelinks });
      } else {
        window.location.href = "/";
      }
    });
  }, []);
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center w-full",
        poppins.className
      )}
    >
      {page !== null && page ? (
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col justify-center text-center mt-2">
              <DocumentPageHeader text={page.pagedetails.pagetitle} />
              <PublishButton documentid={Number(id)} />
            </div>
            <div>
              <DocumentTextArea
                documentid={Number(id)}
                textareatext={page.pagedetails.pagetextcontent}
              />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <NewLinkButton
                openfunction={showNewLink}
                openstatus={newLink as any}
              />
              <Links links={page.pagelinks} />
            </div>
          </div>
          {newLink && (
            <div className="absolute justify-center items-center text-center">
              <CreateNewLinkForm
                documentid={Number(id)}
                closingfunction={showNewLink}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <Loader2Icon className="animate-spin w-64 h-[90vh]" />
          <h1 className="sm:text-4xl md:text-5xl lg:text-2xl">Loading...</h1>
        </div>
      )}
    </div>
  );
}
