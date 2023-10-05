import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import LeftSidebar from "@/components/LeftSidebar";
import Icon from "@/components/Icon";
import Burger from "./Burger";
import { AuthContext } from "@/context/auth-context";
import Router from "next/router";
import Loading from "../Loading";
type LayoutProps = {
  smallSidebar?: boolean;
  hideRightSidebar?: boolean;
  backUrl?: string;
  children: React.ReactNode;
  title?: string;
  title_1?: string;
  title_2?: string;
  heading?: string;
  heading1?: string;
  heading12?: string;
  heading25?: string;
};

const Layout = ({
  smallSidebar,
  hideRightSidebar,
  backUrl,
  children,
  title,
  title_1,
  title_2,
  heading,
  heading1,
  heading12,
  heading25,
}: LayoutProps) => {
  const [visibleSidebar, setVisibleSidebar] = useState<any>(
    smallSidebar || false
  );
  const authContext = useContext(AuthContext);
  const [visibleRightSidebar, setVisibleRightSidebar] =
    useState<boolean>(false);
  const isDesktop = useMediaQuery({
    query: "(max-width: 1179px)",
  });

  const handleClickOverlay = () => {
    setVisibleSidebar(true);
    setVisibleRightSidebar(false);
    clearQueueScrollLocks();
    enablePageScroll();
  };

  useEffect(() => {
    setVisibleSidebar(smallSidebar || isDesktop);
  }, [isDesktop, smallSidebar]);

  useEffect(() => {
    if (!authContext.userLoading && !authContext.isUserAuthenticated()) {
      Router.push("/sign-in");
    }
  }, [authContext]);

  return (
    <>
      {authContext.userLoading ? (
        <Loading />
      ) : (
        <div
          className={`pr-6 bg-n-7 md:p-0 md:bg-n-1 dark:md:bg-n-6 md:overflow-hidden ${
            visibleSidebar
              ? "pl-24 md:pl-0"
              : smallSidebar
              ? "pl-24 md:pl-0"
              : "pl-80 xl:pl-24 md:pl-0"
          }`}
        >
          <LeftSidebar
            value={visibleSidebar}
            setValue={setVisibleSidebar}
            visibleRightSidebar={visibleRightSidebar}
            smallSidebar={smallSidebar}
          />
          <div
            className={`flex pt-0 pb-6 md:py-0 ${
              hideRightSidebar
                ? "min-h-screen min-h-screen-ios"
                : "h-screen h-screen-ios"
            }`}
          >
            <div
              className={`relative flex grow max-w-full bg-n-1  h-auto md:rounded-none dark:bg-n-6  ${
                !hideRightSidebar &&
                "pr-[22.5rem] 2xl:pr-80 lg:pr-0  sm:absolute"
              }`}
            >
              <div
                className={` flex flex-col grow max-w-full  ${
                  !hideRightSidebar ? "md:pt-18 relative" : "relative md:fixed"
                }`}
                style={{ height: "100%" }}
              >
                {/* {!hideRightSidebar && ( */}

                <Burger
                  className={`
                                ${!visibleSidebar && "md:hidden"}
                            `}
                  visibleRightSidebar={visibleRightSidebar}
                  onClick={() => setVisibleRightSidebar(!visibleRightSidebar)}
                />

                {/* )} */}
                {title_2 && (
                  <div className="w-full fixed md:static mt-0 pt-5 bg-n-1 dark:bg-n-6  p-1 pl-12  dark:text-n-1 font-bold h3 md:h4">
                    {title_2}
                  </div>
                )}
                {title && (
                  <div className=" mt-12 ml-12 font-bold h3 md:h4">{title}</div>
                )}
                {title_1 && (
                  <div className=" mt-12 ml-12 font-bold h4 md:h5 tracking-wide">
                    {title_1}
                  </div>
                )}
                {heading && (
                  <div className="ml-15 md:text-center md:ml-0  mt-2 font-bold h3 md:h4">
                    {heading}
                  </div>
                )}
                {heading1 && (
                  <div className="text-center mt-2 font-bold h3 md:h4">
                    {heading1}
                  </div>
                )}
                {heading12 && (
                  <div className="text-left mt-2 ml-8 lg:text-center font-bold h3 md:h4">
                    {heading12}
                  </div>
                )}
                {heading25 && (
                  <div className="text-left mt-2 ml-8 lg:text-center font-bold h5 md:h6">
                    {heading25}
                  </div>
                )}
                {/* {hideRightSidebar && (
                <Link
                  className="absolute top-6 right-6 flex justify-center items-center w-10 h-10 border-2 border-n-4/25 rounded-full text-0 transition-colors hover:border-transparent hover:bg-n-4/25"
                  href={backUrl || "/"}
                >
                  <Icon className="fill-n-4" name="close" />
                </Link>
              )} */}
                <div
                  className={
                    !hideRightSidebar
                      ? `sm:overflow-x-scroll`
                      : `sm:overflow-x-scroll mt-3 sm:mt:4`
                  }
                >
                  {children}
                </div>
              </div>
            </div>
          </div>

          <div
            className={twMerge(
              `fixed inset-0 z-10 bg-n-7/80 invisible opacity-0 md:hidden ${
                (!visibleSidebar && smallSidebar) ||
                (visibleRightSidebar && "visible opacity-100")
              }`
            )}
            onClick={handleClickOverlay}
          ></div>
        </div>
      )}
    </>
  );
};

export default Layout;
