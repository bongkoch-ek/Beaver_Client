import { Plus, User2Icon } from "lucide-react";
import React from "react";
import useUserStore from "../stores/userStore";

const ProfileImage = ({ isDisabled, previewImage }) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="relative w-[160px] h-[160px] flex justify-center items-center bg-white rounded-full group">
      <div
        className={`absolute inset-0 flex justify-center items-center bg-[rgba(35,44,53,0.4)] rounded-full opacity-0 ${
          !isDisabled && "group-hover:opacity-100"
        } transition-opacity duration-300`}
      >
        <Plus color="white" size="48px" />
      </div>
      {user.profileImage || previewImage ? (
        <img
          src={previewImage || user.profileImage}
          alt="Profile"
          className="w-full h-full bg-cover bg-center rounded-full"
        />
      ) : (
        <User2Icon fill="#FFE066" color="#FFFFFF" size="100px" />
      )}
    </div>
  );
};

export default ProfileImage;
