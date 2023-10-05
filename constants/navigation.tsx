import { FcRefresh } from "react-icons/fc";
import { FaShopify, FaStoreAlt } from "react-icons/fa";
import { BsDatabaseFillDown , BsDatabaseFillGear} from "react-icons/bs";
import { GiDatabase, GiArtificialIntelligence } from "react-icons/gi";
import { useRouter } from "next/router";
import { useState } from "react";
import Router from "next/router";



export const navigation = [
  {
    title: "Connect your shopify store",
    icon: <FaShopify className="h4" color="#52BA69" />,
    color: "#52BA69",
    url: "/",
    refresh: false,
    isChecked: true
  },
  // {
  //   title: "Confirm store details",
  //   icon: <FaStoreAlt className="h4" color="#D84C10" />,
  //   color: "#D84C10",
  //   url: "/",
  //   refresh: true,
  //   isChecked: true,
  // },
  {
    title: "Import data",
    icon: <BsDatabaseFillDown className="h4" color="#0084FF" />,
    color: "#8E55EA",
    refresh: true,
    url: "/",
    isChecked: false,
  },
  {
    title: "Create Training Data",
    icon:  <BsDatabaseFillGear className="h4" color="#8E55EA" />,
    color: "#0084FF",
    url: "/",
    refresh: true,
    isChecked: false,
  },

  {
    title: "Review train data",
    icon: <GiArtificialIntelligence className="h4" color="#E68A1D" />,
    color: "#E68A1D",
    url: "/",
    refresh: true,
    isChecked: false,
  },
];

