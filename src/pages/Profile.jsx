import { PencilIcon, User2Icon, UserSquare } from "lucide-react";
import React from "react";
import ProfileImage from "../components/ProfileImage";
import BackgroundImage from "../components/BackgroundImage";
import PrimaryButton from "../components/PrimaryButton";

const Profile = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen py-10">
      <div className="mx-[110px] rounded-[32px] pb-10 bg-white">
        <div className="relative">
          <BackgroundImage />
          <div className="absolute inset-0 flex justify-center items-start top-1/2 ">
            <ProfileImage />
          </div>
        </div>
        <div className="pt-[80px] pb-6">
          <label className="flex flex-col gap-0.5 px-10 py-6 rounded-[32px]">
            {" "}
            Bio
            <textarea
              name="bio"
              placeholder="Describe about yourself ..."
              className="resize-none min-h-[120px] px-2 py-3 rounded border border-[#d3d5d7] justify-start items-start gap-2"
            ></textarea>
          </label>
        </div>
        <div className="flex flex-col gap-5 px-10 py-6">
          <p className="text-[#333333] text-lg font-normal leading-[30px]">
            Account Info
          </p>
          <div className="flex gap-10">
            <label className="flex flex-col gap-0.5 w-full ">
              {" "}
              Firstname
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                className="px-2 py-3 rounded border border-[#d3d5d7]"
              />
            </label>
            <label className="flex flex-col gap-0.5 w-full">
              {" "}
              Lastname
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                className="px-2 py-3 rounded border border-[#d3d5d7]"
              />
            </label>
          </div>
          <div className="flex gap-10">
            <label className="flex flex-col gap-0.5 w-full">
              {" "}
              Display name
              <input
                type="text"
                placeholder="Display name"
                className="px-2 py-3 rounded border border-[#d3d5d7]"
              />
            </label>
            <label className="flex flex-col gap-0.5 w-full">
              {" "}
              Phone number
              <input
                type="text"
                placeholder="08X-XXX-XXXX"
                className="px-2 py-3 rounded border border-[#d3d5d7]"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-1/6">
            <PrimaryButton text="Edit" Icon={() => <PencilIcon size={18} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
