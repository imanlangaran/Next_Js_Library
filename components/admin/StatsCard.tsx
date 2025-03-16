import { cn } from "@/lib/utils";
import {
  ArrowUp,
  ChevronUp,
  CircleArrowUp,
  Play,
  Triangle,
} from "lucide-react";
import React from "react";

interface Props {
  title: string;
  telorance: number;
  value: number;
  className?: string;
}

const StatsCard = ({ title, telorance, value, className }: Props) => {
  return (
    <div className={cn("admin-main p-4", className)}>
      <div className="flex flex-row gap-1 items-center">
        <h3 className="text-lg font-medium text-slate-500">{title}</h3>
        {/* <CircleArrowUp width={18} height={18} className={cn('ml-2', telorance > 0 ? 'text-green-500' : 'text-red-500 rotate-180')} /> */}
        {/* <ChevronUp width={18} height={18} className={cn('ml-2', telorance > 0 ? 'text-green-500' : 'text-red-500 rotate-180')} /> */}
        {/* <ArrowUp width={18} height={18} className={cn('ml-2', telorance > 0 ? 'text-green-500' : 'text-red-500 rotate-180')} /> */}
        <Triangle
          fill="currentColor"
          width={12}
          height={12}
          className={cn(
            "ml-2",
            telorance > 0 ? "text-green-500" : "text-red-500 rotate-180"
          )}
        />
        <p className="text-sm text-gray-500 py-auto">{telorance}</p>
      </div>
      <p className="text-2xl font-bold pt-2">{value}</p>
    </div>
  );
};

export default StatsCard;
