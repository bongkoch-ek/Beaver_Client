import React from "react";

export default function SecondaryButton({
  text,
  type,
  isClicked,
  color,
  Icon,
  ...rest
}) {
  return (
    <div>
      <button
        type={type}
        {...rest}
        className={`border-2 border-[#767676]
      ${
        isClicked == text
          ? "bg-[#FFE066] duration-300 text-white font-semibold"
          : "bg-white border-[#767676] text-[#767676] hover:bg-[#ECF1F6] font-semibold hover:border-[#91959a] "
      }
           text-[16px] ${color} font-normal text-center
           px-4 py-2 w-full rounded-[8px] min-w-[40px]`}
      >
        <div className="flex items-center justify-center gap-4">
          {Icon && <Icon />}
          {text}
        </div>
      </button>
    </div>
  );
}
