import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { FiRefreshCcw } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { HiMiniChevronRight } from "react-icons/hi2";
import { TbRefresh } from "react-icons/tb";
import { MdArrowForwardIos } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
type MenuType = {
  title: string;
  description?: string;
  icon: any;
  color?: string;
  url?: string;
  refresh?: boolean;
  isChecked?: boolean;
  onClick?: () => void;
};

type MenuProps = {
  className?: string;
  items: MenuType[];
};

const Menu = ({ className, items }: MenuProps) => (
  <div className={className}>
    {items.map((item, index) =>
      item.url ? (
        <Link
          className="group flex items-center mb-5 p-3.5 border-2 border-n-2.8 rounded-xl h6 md:text-sm  transition-all  hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5  dark:hover:bg-n-7"
          href={item.url}
          key={index}
          onMouseEnter={(e) => {
            const element = e.currentTarget as HTMLAnchorElement;
            element.style.borderColor = item.color || "gray";
          }}
          onMouseLeave={(e) => {
            const element = e.currentTarget as HTMLAnchorElement;
            element.style.borderColor = "gray";
          }}
        >
          <div className="relative flex justify-center items-center w-15 h-15 mr-6">
            <div
              className="w-15 h-15 rounded-xl inset-0 opacity-20"
              style={{
                backgroundColor: item.color,
                borderColor: item.color,
              }}
            ></div>
            <div className="absolute z-1" color={item.color}>
              {item.icon}
            </div>
          </div>
          <div>
            <div className="text-left">{item.title}</div>
            <div className="text-n-4 text-sm text-start md:mt-1 md:text-xs">
              {item.description}
            </div>
          </div>
          <div className="w-[10%] ml-auto">
            <HiMiniChevronRight
              className="ml-auto text-2xl"
              color={item.isChecked ? "green" : "grey"}
            />
          </div>
          {/* {item.refresh && <TbRefresh className="ml-5 h5 text-primary-1" />} */}
        </Link>
      ) : (
        <button
          className="group w-full flex items-center mb-5 p-3.5 border-2 border-n-2.8 rounded-xl h6 md:text-sm transition-all  hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5 dark:border-n-5  dark:hover:bg-n-7"
          key={index}
          onClick={item.onClick}
          style={{
            borderColor: "gray",
          }}
          onMouseEnter={(e) => {
            const element = e.currentTarget as HTMLButtonElement;
            element.style.borderColor = item.color || "gray";
          }}
          onMouseLeave={(e) => {
            const element = e.currentTarget as HTMLButtonElement;
            element.style.borderColor = "gray";
          }}
        >
          <div className="relative flex justify-center items-center w-15 h-15 mr-6">
            <div
              className="w-15 h-15 rounded-xl inset-0 opacity-20"
              style={{
                backgroundColor: item.color,
              }}
            ></div>
            <div className="absolute z-1" color={item.color}>
              {item.icon}
            </div>
          </div>
          <div>
            <div className="text-start">{item.title}</div>
            <div className="text-start text-n-4 text-sm md:mt-1 md:text-xs">
              {item.description}
            </div>
          </div>
          <div className="w-[10%] ml-auto">
            {item.isChecked ? (
              <FaCheck className="ml-auto text-xl text-green-600" />
            ) : (
              <HiMiniChevronRight className="ml-auto text-2xl text-n-4" />
            )}
          </div>
          {/* {item.refresh && <TbRefresh className="ml-5 h5 text-primary-1" />} */}
        </button>
      )
    )}
  </div>
);

export default Menu;
