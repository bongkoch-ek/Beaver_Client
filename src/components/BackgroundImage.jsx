import React from "react";
import SecondaryButton from "./common/SecondaryButton";
import { Plus } from "lucide-react";
import bgImage from "../pictures/bg-image.png";

const BackgroundImage = () => {
  return (
    <div>
      <div
        className="
        w-full h-[140px] relative rounded-tl-[32px] rounded-tr-[32px]"
      >
        <img src={bgImage} alt="bgImage" className="w-full h-full" />
      </div>
    </div>
  );
};

export default BackgroundImage;
