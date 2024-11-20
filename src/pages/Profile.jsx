import { PencilIcon, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProfileImage from "../components/ProfileImage";
import PrimaryButton from "../components/common/PrimaryButton";
import Input from "../components/common/Input";
import IconButton from "../components/common/IconButton";
import SecondaryButton from "../components/common/SecondaryButton";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import BackgroundImage from "../components/BackgroundImage";
import LoadingPage from "./LoadingPage";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const actionUpdateProfile = useUserStore(
    (state) => state.actionUpdateProfile
  );
  const token = useUserStore((state) => state.token);

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

  const hdlPreviewImage = (e) => {
    if (isDisabled) return;
    setLoading(true);
    try {
      const file = e?.target?.files[0];
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);
        setImage(file);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating preview image:", error);
    }
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const nameParts = user.fullname.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      setEditedForm({
        bio: user.bio || "",
        firstname: firstname,
        lastname: lastname,
        displayname: user.displayName || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const [editedForm, setEditedForm] = useState({
    bio: user.bio,
    firstname: user.fullname.split(" ")[0],
    lastname: user.fullname.split(" ")[1],
    displayname: user.displayName,
    phone: user.phone,
  });

  const validateForm = () => {
    const newErrors = {};
    if (editedForm.bio.trim() === "") newErrors.bio = "Bio is required.";
    if (editedForm.firstname.trim() === "")
      newErrors.firstname = "Firstname is required.";
    if (editedForm.lastname.trim() === "")
      newErrors.lastname = "Lastname is required.";
    if (editedForm.displayname.trim() === "")
      newErrors.displayname = "Display name is required.";
    if (editedForm.phone.trim() === "")
      newErrors.phone = "Phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hdlClickSave = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("bio", editedForm?.bio);
      form.append("displayName", editedForm?.displayname);
      form.append("firstname", editedForm?.firstname);
      form.append("lastname", editedForm?.lastname);
      form.append("phone", editedForm?.phone);
      if (image) {
        form.append("profileImage", image);
      }

      const result = await actionUpdateProfile(token, form);
      toast.success("Update profile successfully");

      if (result.user) {
        const nameParts = result.user.fullname.trim().split(" ");
        const firstname = nameParts[0] || "";
        const lastname = nameParts.slice(1).join(" ") || "";

        setEditedForm({
          bio: result.user.bio || "",
          firstname,
          lastname,
          displayname: result.user.displayName || "",
          phone: result.user.phone || "",
        });
      }
      setLoading(false);
      setIsDisabled(true);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const hdlClickEdit = () => {
    setIsDisabled(false);
  };

  const hdlClickCancel = () => {
    setEditedForm({
      bio: user.bio || "",
      firstname: user.fullname.split(" ")[0],
      lastname: user.fullname.split(" ")[1],
      displayname: user.displayName || "",
      phone: user.phone || "",
    });
    setPreviewImage(null);
    setImage(null);
    setIsDisabled(true);
  };

  return (
    <div
      className="bg-[#F5F5F5] min-h-screen py-10 relative"
    >
      {loading && (
        <div className="fixed inset-0 flex items-center w-full justify-center bg-gray-100 z-50">
          <LoadingPage />
        </div>
      )}
      <div
        className={`${
          loading ? "opacity-50" : "opacity-100"
        } mx-[110px] rounded-[32px] pb-10 bg-white`}
      >
        <div className="relative">
          <BackgroundImage />
          <div className="absolute inset-0 flex justify-center items-start top-1/2 group">
            <div className="relative">
              {previewImage !== null ? (
                <img
                  src={previewImage}
                  className="bg-cover bg-center rounded-full w-[160px] h-[160px] bg-white border"
                  alt="Preview"
                />
              ) : (
                <ProfileImage
                  isDisabled={isDisabled}
                  previewImage={previewImage}
                />
              )}
              <div
                className={`absolute bottom-5 right-3 ${
                  isDisabled && "opacity-0"
                } group-hover:opacity-0 transition-opacity duration-200`}
              >
                <label className="relative">
                  <IconButton
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => hdlPreviewImage(e)}
                    Icon={() => <Plus color="#333333" size={16} />}
                  />
                  <input
                    type="file"
                    id="previewImage"
                    name="previewImage"
                    disabled={isDisabled}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      hdlPreviewImage(e);
                    }}
                    className="opacity-0 absolute -top-[150%] -inset-24 right-1/2"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[80px]">
          <label className="flex flex-col gap-0.5 px-10 py-6 rounded-[32px] text-sm">
            Bio
            <textarea
              onChange={(e) =>
                setEditedForm({ ...editedForm, bio: e.target.value })
              }
              disabled={isDisabled}
              value={editedForm.bio}
              name="bio"
              placeholder="Describe about yourself ..."
              className={`resize-none min-h-[120px] px-4 py-4 justify-start items-start gap-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5DB9F8] ${
                isDisabled &&
                "bg-gray-100 text-gray-500 border-gray-300 border-none "
              } font-semibold placeholder:font-normal`}
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
              onChange={(e) =>
                setEditedForm({ ...editedForm, firstname: e.target.value })
              }
              value={editedForm.firstname}
              isDisabled={isDisabled}
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname}</p>
            )}
            <Input
              label="Lastname"
              placeholder="Lastname"
              type="text"
              name="lastname"
              onChange={(e) =>
                setEditedForm({ ...editedForm, lastname: e.target.value })
              }
              value={editedForm.lastname}
              isDisabled={isDisabled}
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname}</p>
            )}
          </div>
          <div className="flex gap-10">
            <Input
              label="Display name"
              placeholder="Display name"
              type="text"
              name="displayname"
              onChange={(e) =>
                setEditedForm({ ...editedForm, displayname: e.target.value })
              }
              value={editedForm.displayname}
              isDisabled={isDisabled}
            />
            <Input
              label="Phone number"
              placeholder="08X-XXX-XXXX"
              type="text"
              name="phone"
              onChange={(e) =>
                setEditedForm({ ...editedForm, phone: e.target.value })
              }
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
