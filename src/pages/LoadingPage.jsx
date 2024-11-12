import React from "react";
import beaverLoading from "../src/icons/beaver-loading.gif";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <img src={beaverLoading} alt="Loading..." className="w-24 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
