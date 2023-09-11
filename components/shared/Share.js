"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Link, Send, Share } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton({
  post,
  name,
}) {
  const shareData = {
    title: "Threads",
    text: "Link to " + name + "'s post on Threads",
    url: "http://localhost:3000/thread/" + post,
  };

  return (
    <DropdownMenu>
        

      <DropdownMenuTrigger className="text-slate-600">
        {" "}
        <Send className="w-[18px] h-[18px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-700" align="start">
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(shareData.url);
            toast.success("Copied to clipboard");
          }}
        >
          {" "}
          <Link className="mr-2 h-4 w-4" />
          <h1 className="cursor-pointer text-base-semibold text-light-1">Copy Link</h1>

          
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigator.share(shareData);
          }}
        >
          {" "}
          <Share className="mr-2 h-4 w-4" />
          <h1 className="cursor-pointer text-base-semibold text-light-1">Share Via...</h1>

          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}