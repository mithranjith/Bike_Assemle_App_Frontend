import { useState, useEffect, useContext } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Search from "@/components/Search";
import Settings from "@/components/Settings";
import Navigation from "./Navigation";
import ToggleTheme from "./ToggleTheme";
import { settings } from "@/constants/settings";
import { twMerge } from "tailwind-merge";
import {
  IoChatbubbleEllipsesSharp,
  IoSettingsOutline,
  IoStorefront,
} from "react-icons/io5";
import { BiScatterChart } from "react-icons/bi";
import { PiChatsLight } from "react-icons/pi";
import { BsDatabase, BsQuestionLg } from "react-icons/bs";
import { FaHatWizard, FaUsers } from "react-icons/fa";
import { PiStorefrontLight } from "react-icons/pi";
import Router, { useRouter } from "next/router";
import { AuthContext } from "@/context/auth-context";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

type LeftSidebarProps = {
  value: boolean;
  setValue?: any;
  smallSidebar?: boolean;
  visibleRightSidebar?: boolean;
};

const LeftSidebar = ({
  value,
  setValue,
  smallSidebar,
  visibleRightSidebar,
}: LeftSidebarProps) => {
  const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
  const [visibleSettings, setVisibleSettings] = useState<boolean>(false);
  const [visibleChatBot, setVisibleChatBot] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ _id: "", isAdmin: false });

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, []);

  const handleWindowKeyDown = (event: any) => {
    if (event.metaKey && event.key === "f") {
      event.preventDefault();
      setVisibleSearch(true);
    }
  };
  useEffect(() => {
    if (authContext.authState.user._id) {
      setUser(authContext.authState.user);
    }
  }, [authContext.authState]);

  const navigation = [
    {
      title: "Dashboard",
      icon: (
        <BiScatterChart
          className={
            router.pathname === "/" ? "h5 fill-primary-1" : "h5 fill-n-4"
          }
        />
      ),
      color: "fill-primary-2",
      url: "/",
    },
    {
      title: "Settings",
      icon: <IoSettingsOutline className="h5 !fill-n-4" />,
      color: "fill-accent-6",
      onClick: () => setVisibleSettings(true),
    },
    {
      title: "Logout",
      icon: (
        <MdLogout
          className={
            router.pathname === "/sign-in" ? "h5 fill-primary-1" : "h5 fill-n-4"
          }
        />
      ),
      color: "fill-accent-3",
      onClick: () => {
        authContext.logout();
      },
    },
  ];
  const adminNavigation = [
    {
      title: "Dashboard",
      icon: (
        <BiScatterChart
          className={
            router.pathname === "/admin/dashboard"
              ? "h5 fill-primary-1"
              : "h5 fill-n-4"
          }
        />
      ),
      color: "fill-primary-2",
      url: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: (
        <FaUsers
          className={
            router.pathname === "/admin/users"
              ? "h5 fill-primary-1"
              : "h5 fill-n-4"
          }
        />
      ),
      color: "fill-accent-4",
      url: "/admin/users",
    },
    {
      title: "Settings",
      icon: <IoSettingsOutline className="h5 !fill-n-4" />,
      color: "fill-accent-6",
      onClick: () => setVisibleSettings(true),
    },

    {
      title: "Logout",
      icon: (
        <MdLogout
          className={
            router.pathname === "/sign-in" ? "h5 fill-primary-1" : "h5 fill-n-4"
          }
        />
      ),
      color: "fill-accent-3",
      onClick: () => {
        authContext.logout();
      },
    },
  ];
  const handleClick = () => {
    setValue(!value);
    smallSidebar && value ? disablePageScroll() : enablePageScroll();
  };

  return (
    <>
      <div
        className={twMerge(
          `fixed z-20 top-0 left-0 bottom-0 flex flex-col pt-30 px-4 bg-n-7 md:invisible md:opacity-0 md:transition-opacity ${
            value ? "w-24 pb-38 md:w-16 md:px-0 md:pb-30" : "w-80"
          } ${visibleRightSidebar && "md:visible md:opacity-100"}`
        )}
      >
        <div
          className={`absolute top-0 right-0 left-0 flex items-center h-30 pl-7 pr-6 ${
            value ? "justify-center md:px-4" : "justify-between"
          }`}
        >
          {!value && <Logo dark={false} />}
          <button
            className="group tap-highlight-color hover:text-blue "
            onClick={handleClick}
          >
            <Icon
              className="fill-n-4 transition-colors   group-hover:purple "
              name={value ? "toggle-on" : "toggle-off"}
            />
          </button>
        </div>

        <div className="grow overflow-y-auto scroll-smooth  scrollbar-none  ">
          <Navigation
            visible={value}
            items={user.isAdmin ? adminNavigation : navigation}
          />
          <div
            className={`my-4 h-0.25 bg-n-6 ${
              value ? "-mx-4 md:mx-0" : "-mx-2 md:mx-0"
            }`}
          ></div>
          {/* <ChatList visible={value} items={chatList} /> */}
        </div>
        <div className="absolute left-0 bottom-0 right-0 pb-6 px-4 bg-n-7 before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none md:px-3">
          <ToggleTheme visible={value} />
        </div>
      </div>

      <Modal
        className="md:!p-0"
        classWrap="max-w-[48rem] md:min-h-screen-ios md:rounded-none"
        classButtonClose="absolute top-6 right-6 w-10 h-10 rounded-full bg-n-2 md:top-5 md:right-5 dark:bg-n-4/25 dark:fill-n-4 dark:hover:fill-n-1"
        classOverlay="md:bg-n-1"
        visible={visibleSettings}
        onClose={() => setVisibleSettings(false)}
      >
        <Settings items={settings} />
      </Modal>
    </>
  );
};

export default LeftSidebar;
