import Link from "next/link";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Robot from "@/json/robot.json";
import Form from "./Form";
import shopify from "../../../public/images/shopify.png";
import openai from "../../../public/images/openai.png";
import Chat from "../../../public/images/Chat.png";
import LottieLoader from "react-lottie-loader";
import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
type TestProps = {
  className?: string;
  dark?: boolean;
};
const SignInPage = ({ className, dark }: TestProps) => {
  const authContext = useContext(AuthContext);
  // useEffect(() => {
  //   if (authContext.isUserAuthenticated()) {
  //     Router.push("/");
  //   }
  // }, [authContext.isUserAuthenticated()]);
  const [picture, setPicture] = useState([
    {
      image: "/images/openai.png",
    },
    {
      image: "/images/shopify.png",
    },
  ]);
  return (
    <div className="relative flex mt-8 min-h-screen min-h-screen-ios lg:p-1  md:px-6 md:pt-16 md:pb-10">
      <div className="relative shrink-0 w-[40rem] overflow-hidden p-2 2xl:w-[23rem] xl:w-[33rem] xl:p-10 lg:hidden">
        <div className="max-w-[15rem] flex gap-5 mx-auto d-block items-center"></div>
      </div>
      <div className="flex grow my-1 mr-6 p-2 bg-n-1 rounded-[1.25rem] lg:m-0 md:p-0 dark:bg-n-6">
        <Form />
      </div>
    </div>
  );
};

export default SignInPage;
