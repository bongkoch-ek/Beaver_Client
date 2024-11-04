import React from "react";
import SecondaryButton from "./common/SecondaryButton";
import { Plus } from "lucide-react";
import bgImage from "../../../../pic/bg-image.png"

const BackgroundImage = ({ isDisabled }) => {
  return (
    <div>
      <div
        className={`bg-[#00000026] ${
          isDisabled ? "" : "hover:bg-[#00000055]"
        } w-full h-[120px] relative rounded-tl-[32px] rounded-tr-[32px] transition-all duration-200`}
      >
        <img src={bgImage} alt="bgImage" className="w-full h-full"  />
        <div
          className={`absolute inset-0 flex justify-center items-start top-1/4 opacity-0 ${
            isDisabled
              ? ""
              : "hover:opacity-100 transition-opacity duration-200"
          }`}
        >
          <SecondaryButton
            type="button"
            text="Add Background"
            Icon={() => <Plus size="20" color="#91959A" />}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
