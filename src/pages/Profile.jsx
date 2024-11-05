import { PencilIcon, Plus, User2Icon, UserSquare } from "lucide-react";
import React, { useState } from "react";
import ProfileImage from "../components/ProfileImage";
import PrimaryButton from "../components/common/PrimaryButton";
import Input from "../components/common/Input";
import IconButton from "../components/common/IconButton";
import SecondaryButton from "../components/common/SecondaryButton";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useUserStore(state => state.user);
  const actionUpdateProfile = useUserStore(state => state.actionUpdateProfile);
  const token = useUserStore(state => state.token);
  const setUser = useUserStore(state => state.setUser);
  const [editedForm, setEditedForm] = useState({
    bio: user?.bio || "",
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    displayname: user?.displayname || "",
    phone: user?.phone || "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const hdlOnChangeEditedForm = (e) => {
    setEditedForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlClickEdit = () => {
    setIsDisabled(false);
  };

  const hdlClickSave = async () => {
    try {
        const updatedUser = await actionUpdateProfile(token, editedForm);
        toast.success("Update profile successfully");
        setIsDisabled(true);
    } catch (error) {
        toast.error("Failed to update profile");
    }
};
  const hdlClickCancel = () => {
    setEditedForm({
      bio: user?.bio || "",
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      displayname: user?.displayname || "",
      phone: user?.phone || "",
    });
    setIsDisabled(true);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-10">
      <div className="mx-[110px] rounded-[32px] pb-10 bg-white">
        <div className="relative">
          {/* <BackgroundImage isDisabled={isDisabled} /> */}
          <div className="absolute inset-0 flex justify-center items-start top-1/2 group">
            <div className="relative">
              <ProfileImage isDisabled={isDisabled} />
              <div
                className={`absolute bottom-5 right-3 ${
                  isDisabled && "opacity-0"
                } group-hover:opacity-0 transition-opacity duration-200`}
              >
                <IconButton Icon={() => <Plus color="#333333" size={16} />} />
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="pt-[80px]">
          <label className="flex flex-col gap-0.5 px-10 py-6 rounded-[32px] text-sm">
            {" "}
            Bio
            <textarea
              onChange={hdlOnChangeEditedForm}
              disabled={isDisabled}
              value={editedForm.bio}
              name="bio"
              placeholder="Describe about yourself ..."
              className={`resize-none min-h-[120px] px-4 py-4 justify-start items-start gap-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5DB9F8] ${
                isDisabled &&
                "bg-gray-100 text-gray-500 border-gray-300 border-none "
              }  font-semibold placeholder:font-normal`}
            ></textarea>
          </label>
        </div>
        <div className="flex flex-col gap-4 px-10">
          <p className="text-[#333333] text-lg font-normal leading-[30px]">
            Account Info
          </p>
          <div className="flex gap-10">
            <Input
              label="Firstname"
              placeholder="Firstname"
              type="text"
              name="firstname"
              onChange={hdlOnChangeEditedForm}
              value={editedForm.firstname}
              isDisabled={isDisabled}
            />
            <Input
              label="Lastname"
              placeholder="Lastname"
              type="text"
              name="lastname"
              onChange={hdlOnChangeEditedForm}
              value={editedForm.lastname}
              isDisabled={isDisabled}
            />
          </div>
          <div className="flex gap-10">
            <Input
              label="Display name"
              placeholder="Display name"
              type="text"
              name="displayname"
              onChange={hdlOnChangeEditedForm}
              value={editedForm.displayname}
              isDisabled={isDisabled}
            />
            <Input
              label="Phone number"
              placeholder="08X-XXX-XXXX"
              type="text"
              name="phone"
              onChange={hdlOnChangeEditedForm}
              value={editedForm.phone}
              isDisabled={isDisabled}
            />
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <div className="w-1/6">
            {isDisabled ? (
              <PrimaryButton
                type="button"
                onClick={hdlClickEdit}
                text="Edit"
                Icon={() => <PencilIcon size={18} />}
              />
            ) : (
              <div className="flex flex-col min-w-1/6 gap-6">
                <PrimaryButton
                  type="button"
                  onClick={hdlClickSave}
                  text="Save"
                />
                <SecondaryButton
                  type="button"
                  text="Cancel"
                  onClick={hdlClickCancel}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
