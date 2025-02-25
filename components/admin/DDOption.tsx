import { cn } from "@/lib/utils";
import React from "react";

const DDOption = ({ color, name }: { color: string; name: string }) => {
  return (
    <div className={cn("px-3 py-2 rounded-full w-min",color)}>
      {name}
    </div>
  );
};

export default DDOption;
