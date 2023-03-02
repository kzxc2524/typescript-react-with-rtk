import React, { useState, ReactNode } from "react";

import { Divider } from "@mui/material";

import AlignHorizontalRightRoundedIcon from "@mui/icons-material/AlignHorizontalRightRounded";
import AlignHorizontalLeftRoundedIcon from "@mui/icons-material/AlignHorizontalLeftRounded";

import "../../css/MainNav.scss";

type positions = "left" | "right" | "top" | "bottom";

interface CommonNavProps {
  navList: mainNavList[];
  position: positions;
  children?: ReactNode;
}

interface mainNavList {
  text: string;
  icon: ReactNode;
}

const CommonNav = ({ navList, position, children }: CommonNavProps) => {
  const [openHoldBolean, setOpenHoldBolean] = useState(false);

  interface iconStyle {
    width: string;
    height: string;
  }

  let iconSize: string = `0.65em`;

  const iconStyle: iconStyle = {
    width: iconSize,
    height: iconSize,
  };

  const expandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenHoldBolean((prev) => !prev);
  };

  return (
    <>
      <nav className={"globalNav" + (!openHoldBolean ? "" : " open")} style={{ position: "fixed", [position]: 0, top: 0 }}>
        <div className={"globalNavInner"} style={{ position: "absolute", [position]: 0, top: 0 }}>
          {children}
          <ul>
            {navList.map((item, idx) => {
              let text = item.text;
              let icon = item.icon;
              return (
                <li key={item.text}>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className={"navIcon"}>{icon}</i> <span className={"navText"}>{text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <footer>
            <Divider light />
            <a href="#" onClick={expandClick}>
              <i className={"navIcon"}>
                {position == "left" ? (
                  !openHoldBolean ? (
                    <AlignHorizontalRightRoundedIcon sx={iconStyle} />
                  ) : (
                    <AlignHorizontalLeftRoundedIcon sx={iconStyle} />
                  )
                ) : !openHoldBolean ? (
                  <AlignHorizontalLeftRoundedIcon sx={iconStyle} />
                ) : (
                  <AlignHorizontalRightRoundedIcon sx={iconStyle} />
                )}
              </i>
              <span className={"navText"}>{!openHoldBolean ? "확장하기" : "접기"}</span>
            </a>
          </footer>
        </div>
      </nav>
    </>
  );
};

export default CommonNav;
