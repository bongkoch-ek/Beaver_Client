import { OpenPassword } from "@/src/icons";
import { EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";

export default function Input({
  type = "text",
  label,
  placeholder,
  name,
  value,
  isError = false,
  isDisabled = false,
  errMessage = "",
  ...restProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${type === "password" && "relative"} w-full`}>
      <label
        className={`flex flex-col m-1 text-sm w-full ${
          isError && "text-red-600"
        }`}
      >
        {" "}
        {label}
        <div className="relative">
          <input
            type={(type === "password") & !showPassword ? "password" : "text"}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={isDisabled}
            className={`w-full px-3 py-2 placeholder:font-normal font-semibold ${
              isDisabled
                ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed" // Styles when disabled
                : "bg-white border-gray-300 border"
            }   rounded-md focus:outline-none focus:border-[#5DB9F8] ${
              isError && "border-red-600"
            }`}
            {...restProps}
          />
          {type === "password" && (
            <>
              {showPassword === true ? (
                <EyeIcon
                  onClick={togglePasswordVisibility}
                  className={`absolute ${
                    isError ? "top-1/3 text-[#e53935]" : "top-1/2"
                  } right-3 transform -translate-y-1/2 text-[#767676] cursor-pointer w-6 h-6`}
                />
              ) : (
                <EyeOff
                  onClick={togglePasswordVisibility}
                  className={`absolute ${
                    isError ? "top-1/3 text-[#e53935]" : "top-1/2"
                  } right-3 transform -translate-y-1/2 text-[#767676] cursor-pointer w-6 h-6`}
                />
              )}
            </>
          )}
          {isError && <p>{errMessage}</p>}
        </div>
      </label>
    </div>
  );
}
