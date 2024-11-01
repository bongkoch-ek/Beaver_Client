import { Plus, User2Icon } from "lucide-react";
import React from "react";

const ProfileImage = ({isDisabled}) => {
  return (
    <div>
      <div className="w-[160px] h-[160px] flex justify-center items-center bg-white relative rounded-full ">
        <div className={`absolute opacity-0 ${isDisabled ? "" : "hover:opacity-100 hover:bg-[rgba(35,44,53,0.4)]"} rounded-full h-4/5 w-4/5 flex justify-center items-center transition-all duration-200`}>
          <Plus color="white" size="48px" />
        </div>
        <User2Icon fill="#FFE066" color="#FFFFFF" size="100px" />
      </div>
    </div>
  );
};

export default ProfileImage;
