import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { Loader } from "lucide-react";
import useUserStore from "../stores/userStore";
import { removeFiles, uploadFiles } from "../services/ImageUploadService";
import { Paperclip } from "lucide-react";
import { set } from "date-fns";
import { CloudIcon, VectorIcon } from "../icons";

const UploadFile = ({ input, setInput }) => {
  const token = useUserStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

  // const [form, setForm] = useState({
  //   images: [],
  // });

  const hdlOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      let allFiles = input.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image.`);
          setIsLoading(false);
          continue;
        }
        Resize.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (data) => {
            try {
              const res = await uploadFiles(token, data);
              allFiles.push(res.data);
              setInput({
                ...input,
                images: allFiles,
              });
              toast.success("Image uploaded successfully.");
            } catch (err) {
              console.error("Error uploading image:", err);
              toast.error("Failed to upload image.");
            } finally {
              setIsLoading(false);
            }
          },
          "base64"
        );
      }
    }
  };

  const hdlDelete = (public_id) => {
    setIsLoading(true);
    removeFiles(token, public_id)
      .then((res) => {
        const filterImages = input.images.filter(
          (item) => item.public_id !== public_id
        );
        setInput({
          ...input,
          images: filterImages,
        });
        toast.success("Image removed successfully.");
      })
      .catch((err) => {
        console.error("Error deleting image:", err);
        toast.error("Failed to delete image.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 p-8 items-center justify-center border-2 border-gray-400 rounded-[32px] h-[240px] w-[180px]">
      <div className="bg-gray-300 w-[120px] h-[120px] flex justify-center items-center rounded-md overflow-hidden">
        {isLoading ? (
          <Loader className="w-8 h-8 animate-spin" />
        ) : input.images.length > 0 ? (
          <div className="relative w-full h-full">
            <img
              src={input.images[0].url}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <span
              className="absolute top-2 right-2  w-[16px] h-[16px] text-white text-[12px] font-semibold bg-[#00000050] pl-1 rounded-lg cursor-pointer hover:text-red-500"
              onClick={() => hdlDelete(input.images[0].public_id)}
            >
              X
            </span>
          </div>
        ) : (
          <CloudIcon className="w-12 h-12" />
        )}
      </div>

      <div className="relative flex items-center justify-center w-full cursor-pointer">
        <div className="px-4 py-2 bg-[#ffe066] rounded-lg flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          <span className="text-sm text-[#333333] font-semibold leading-relaxed">
            Image
          </span>
        </div>
        <input
          type="file"
          onChange={hdlOnChange}
          name="images"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UploadFile;
