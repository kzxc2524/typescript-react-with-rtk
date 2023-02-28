import React, { useState, ReactNode } from "react";

import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import CommonNav from "../layout/CommonNav";

const MainNav = () => {
  interface mainNavList {
    text: string;
    icon: ReactNode;
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
    },
    {
      text: "오버레이",
      icon: <LayersIcon sx={iconStyle} />,
    },
    {
      text: "가이드",
      icon: <MenuBookIcon sx={iconStyle} />,
    },
  ];

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
