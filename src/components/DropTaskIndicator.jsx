import React from "react";

const DropTaskIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="h-1 w-full bg-[#55A8E2] rounded-lg opacity-0 transition-opacity duration-100"
    ></div>
  );
};

export default DropTaskIndicator;
