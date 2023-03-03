import React, { useState, ReactNode } from "react";

import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

import CommonNav from "../layout/CommonNav";

interface mainNavList {
  text: string;
  icon: ReactNode;
  url: string;
}

interface iconStyle {
  width: string;
  height: string;
}

let iconSize: string = `0.65em`;

const iconStyle: iconStyle = {
  width: iconSize,
  height: iconSize,
};

const mainNavList: mainNavList[] = [
  {
    text: "홈",
    icon: <HomeIcon sx={iconStyle} />,
    url: "/",
  },
  {
    text: "가이드",
    icon: <MenuBookIcon sx={iconStyle} />,
    url: "/",
  },
  {
    text: "검색",
    icon: <QueryStatsIcon sx={iconStyle} />,
    url: "/search",
  },
  {
    text: "인기",
    icon: <LocalActivityIcon sx={iconStyle} />,
    url: "/",
  },
];

const MainNav = () => {
  return (
    <>
      <CommonNav navList={mainNavList} position={"left"}>
        <h1 className={"navHead"}>
          <i className={"navIcon"}>
            <DiamondIcon style={{ color: "red" }} />
          </i>
          <span className={"navText"}>CSI-Vision</span>
        </h1>
      </CommonNav>
    </>
  );
};

export default MainNav;
