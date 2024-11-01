import React from "react";
import SecondaryButton from "./SecondaryButton";
import { Plus } from "lucide-react";

const BackgroundImage = () => {
  return (
    <div>
      <div className="bg-[#00000026] hover:bg-[#00000055] w-full h-[120px] relative rounded-tl-[32px] rounded-tr-[32px] transition-all duration-200">
        <div className="absolute inset-0 flex justify-center items-start top-1/4 opacity-0 hover:opacity-100 transition-opacity duration-200">
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
