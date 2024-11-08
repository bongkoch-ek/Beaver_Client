import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { Loader, Paperclip } from 'lucide-react';
import useUserStore from "../stores/userStore";
import { removeFiles, uploadFiles } from "../services/ImageUploadService";

const UploadFile = () => {
    const token = useUserStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
      images: [],
    });

    const hdlOnChange = (e) => {
      setIsLoading(true);
      const files = e.target.files;
      if (files) {
        let allFiles = [...form.images];
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
                setForm({
                  ...form,
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
          const filterImages = form.images.filter((item) => item.public_id !== public_id);
          setForm({
            ...form,
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
      <div className="my-4">
        <div className="relative h-[42px] px-4 py-2 bg-[#ffe066] rounded-lg justify-center items-center gap-2 inline-flex cursor-pointer">
          <Paperclip className="mr-2" />
          <span className="text-center text-[#333333] text-base font-semibold leading-relaxed">
            Attach Files
          </span>
          <input
            type="file"
            onChange={hdlOnChange}
            name="images"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex gap-4 my-4">
          {isLoading && <Loader className="w-8 h-8 animate-spin" />}
          {form.images.map((item, index) => (
            <div className="relative" key={index}>
              <img
                src={item.url}
                alt={`Image ${index}`}
                className="w-24 h-24 object-cover rounded-lg transition-transform duration-200 ease-in-out hover:scale-110"
              />
              <span
                className="absolute top-0 right-0 p-1 text-white cursor-pointer hover:text-red-500"
                onClick={() => hdlDelete(item.public_id)}
              >
                X
              </span>
            </div>
          ))}
        </div>
      </div>
    );
};

export default UploadFile;
