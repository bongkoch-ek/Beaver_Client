import React from "react";

export default function PrimaryButton({ type, text, Icon, isEmpty, ...rest }) {
  return (
    <div>
      <button
        disabled={isEmpty}
        {...rest}
        className={` hover:bg-[#e8cc5d] hover:duration-200 px-4 py-2 bg-[#ffe066] rounded-[8px] justify-center items-center inline-flex w-full font-semibold text-[16px] leading-relaxed`}
        type={type}
      >
        <div className="flex items-center justify-center gap-2 text-[#333333]">
          {Icon && <Icon />}
          {text}
        </div>
      </button>
    </div>
  );
}
