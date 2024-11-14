import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { Loader } from "lucide-react";
import useUserStore from "../stores/userStore";
import { removeFiles, uploadFiles } from "../services/ImageUploadService";
import { Paperclip } from "lucide-react";
import { CloudIcon } from "../icons";
import PrimaryButton from "./common/PrimaryButton";
import { createImagesInTask } from "../services/DashboardService";

const UploadFile = ({ input, setInput }) => {
  const token = useUserStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);

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
          1920,
          1080,
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
              await createImagesInTask(token, input);
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

  const hdlDelete = (public_id, asset_id) => {
    setIsLoading(true);
    removeFiles(token, public_id, asset_id)
      .then(() => {
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

  const handleImageClick = () => {
    if (input.images.length > 0) {
      window.open(input.images[0].url, "_blank"); // เปิด URL ของภาพในแท็บใหม่
    }
  };

  return (
    <div className="">
      <div className="relative flex items-center w-full cursor-pointer">
        <PrimaryButton
          text="Image"
          type="button"
          Icon={() => <Paperclip className="h-4 w-4" />}
        />
        <input
          type="file"
          onChange={hdlOnChange}
          name="images"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      
      <div className="w-[120px] flex justify-start items-center overflow-hidden mt-4">
  {isLoading ? (
    <Loader className="w-8 h-8 animate-spin ml-[35px]" />
  ) : input?.images?.length > 0 ? (
    <div className="relative w-[120px] h-[120px] cursor-pointer rounded-full" onClick={handleImageClick}>
      <img
        src={input.images[0].url}
        alt="Preview"
        className="w-full h-full object-cover rounded-lg" // ใช้ rounded-full เพื่อให้ภาพเป็นวงกลม
      />
      <span
        className="absolute top-2 right-2 w-[16px] h-[16px] text-white text-[12px] font-semibold bg-[#00000050] pl-1 rounded-lg cursor-pointer hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          hdlDelete(input.images[0].public_id, input.images[0].asset_id);
        }}
      >
        X
      </span>
    </div>
  ) : (
    <div></div>
  )}
</div>
    </div>
  );
};

export default UploadFile;