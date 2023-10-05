import React from "react";
import LottieLoader from "react-lottie-loader";
import Shopify from "@/json/loading.json";

const Loading = () => {
  return (
    <div className="h-screen mx-auto flex justify-center items-center">
      <div className="h-[300px] w-[80%] mx-auto flex justify-center items-center">
        <LottieLoader animationData={Shopify} />
      </div>
    </div>
  );
};
export default Loading;
