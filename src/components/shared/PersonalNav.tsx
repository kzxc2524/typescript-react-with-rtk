import React, { useState, ReactNode } from "react";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import CommonNav from "../layout/CommonNav";

const PersonalNav = () => {
  interface myNavList {
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

  const myNavList: myNavList[] = [
    {
      text: "설정",
      icon: <SettingsIcon sx={iconStyle} />,
      url: "/",
    },
    {
      text: "계정 생성",
      icon: <PersonAddIcon sx={iconStyle} />,
      url: "/",
    },
    {
      text: "검색 기록",
      icon: <PendingActionsIcon sx={iconStyle} />,
      url: "/",
    },
  ];

  // const expandClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setOpenHoldBolean((prev) => !prev);
  // };

  return (
    <>
      <CommonNav navList={myNavList} position={"right"}>
        <a className={"navHead"}>
          <i className={"navIcon"}>
            <AssignmentIndIcon />
          </i>
          <span className={"navText"}>게스트</span>
        </a>
      </CommonNav>
    </>
  );
};

export default PersonalNav;
