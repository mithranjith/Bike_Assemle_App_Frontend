import { useRouter } from "next/router";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";

type NavigationType = {
  title: string;
  icon: any;
  color: string;
  url?: string;
  onClick?: () => void;
};

type NavigationProps = {
  visible?: boolean;
  items: NavigationType[];
};

const Navigation = ({ visible, items }: NavigationProps) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div className={`${visible && "px-2"}`}>
      {items.map((item, index) =>
        item.url ? (
          <Link
            className={twMerge(
              `flex items-center h-12 base2 font-semibold text-n-8/75 rounded-lg transition-colors hover:text-n-1 ${
                router.pathname === item.url &&
                "text-n-1 bg-gradient-to-l from-[#323337] to-[rgba(70,79,111,0.3)] shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]"
              } ${visible ? "px-3" : "px-5"}`
            )}
            href={item.url}
            key={index}
          >
            {/* <Icon className={item.color} name={item.icon} /> */}
            {item.icon}
            {!visible && (
              <div
                className={
                  router.pathname === item.url ? "ml-5 text-purple" : "ml-5"
                }
                style={router.pathname === item.url ? { color: "#8E55EA" } : {}}
              >
                {item.title}
              </div>
            )}
          </Link>
        ) : (
          <div key={index}>
            {item.title == "Settings" && (
              <div className={`my-4 h-0.25 bg-n-6`}></div>
            )}
            <button
              className={`flex items-center w-full h-12 base2 font-semibold text-n-8/75 rounded-lg transition-colors hover:text-n-1 ${
                visible ? "px-3" : "px-5"
              }`}
              onClick={item.onClick}
            >
              {/* <Icon className={item.color} name={item.icon} /> */}
              {item.icon}
              {!visible && (
                <div
                  className={
                    router.pathname === item.url ? "ml-5 text-purple" : "ml-5"
                  }
                >
                  {item.title}
                </div>
              )}
              {item.title === "Search" && !visible && (
                <div
                  className={
                    router.pathname === item.url
                      ? "text-purple ml-auto px-2 rounded-md bg-n-4/50 caption1 font-semibold text-n-8"
                      : "ml-auto px-2 rounded-md bg-n-4/50 caption1 font-semibold text-n-8"
                  }
                >
                  ⌘ F
                </div>
              )}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Navigation;
