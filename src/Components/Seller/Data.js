import React from "react";
// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilPackage,
  UilCalendarAlt,
  UilShop,
  UilCamera,
  UilVenus,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

// Recent Card Imports

import sajjad from "../../images/sajjad.jpeg";
import yaseen from "../../images/yaseen.jpeg";
import zaidi from "../../images/zaidi.jpg";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  // {
  //   icon: UilClipboardAlt,
  //   heading: "Orders",
  // },
  {
    icon: UilPackage,
    heading: "Products",
  },
  {
    icon: UilShop,
    heading: "Marquees",
  },
  {
    icon: UilCamera,
    heading: "Photographer",
  },
  {
    icon: UilVenus,
    heading: "Saloon",
  },
  {
    icon: UilCalendarAlt,
    heading: "Bookings",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Daily Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 50,
    value: "97500",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Total Sales",
    color: {
      // backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      backGround: "#03A9F4",
      boxShadow: "0px 10px 20px 0px #5e94d1",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Bookings",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: sajjad,
    name: "Sajjad Akhtar",
    noti: "has ordered Chafing Dish.",
    time: "25 seconds ago",
  },
  {
    img: yaseen,
    name: "yaseen",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: zaidi,
    name: "Ali Hassan",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
