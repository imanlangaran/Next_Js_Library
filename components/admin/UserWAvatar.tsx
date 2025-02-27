import { cn, getInitial } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import React from "react";

type NewType = {
  name: string | null;
  email: string | null;
  hideNameInMD?: boolean;
};

const UserWAvatar = ({
  name,
  email,
  hideNameInMD = false,
}: NewType) => {
  return (
    <div className="user" >
      <Avatar>
        <AvatarFallback className="bg-amber-100">
          {getInitial(name || "OO")}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col text-start", hideNameInMD && "max-md:hidden")}>
      {/* <div className="flex flex-col max-md:hidden text-start"> */}
        <p className="font-semibold text-dark-200">{name}</p>
        <p className="text-light-500 text-xs">{email}</p>
      </div>
    </div>
  );
};

export default UserWAvatar;
