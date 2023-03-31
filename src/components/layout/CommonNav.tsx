import React, { useState, ReactNode } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { changeDrawer } from "@/stores/slices/drawerAnchorSlice";

import { Divider, Box, IconButton } from "@mui/material";

import { styled } from "@mui/material/styles";

import AlignHorizontalRightRoundedIcon from "@mui/icons-material/AlignHorizontalRightRounded";
import AlignHorizontalLeftRoundedIcon from "@mui/icons-material/AlignHorizontalLeftRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import "../../css/MainNav.scss";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface styleProps {
  display: string;
  theme_mode: string;
  direction: string;
}

const StyledBox = styled(Box)<Pick<styleProps, "display">>(({ theme, display }) => {
  return {
    "&": {
      display: "none",
      [theme.breakpoints.down(1024)]: {
        display: display,
        width: "100vw",
        height: "100vh",
        position: "absolute",
        background: "#00000060",
      },
    },
  };
});

const InnerNav = styled("nav")<Omit<styleProps, "display">>(({ theme, theme_mode, direction }) => {
  let value = 1;
  switch (direction) {
    case "left":
      value = 1;
      break;
    case "right":
      value = 0;
      break;
  }
  const shadow = `${value}px 0px 10px 0px #41414150`;
  return {
    "&": {
      position: "fixed",
      [direction]: 0,
      top: 0,
      "& .globalNavInner": {
        position: "absolute",
        [direction]: 0,
        top: 0,
      },
      "&.open .globalNavInner, &:hover .globalNavInner": {
        boxShadow: shadow,
      },
    },
  };
});

const StyledIconButton = styled("a")<Pick<styleProps, "theme_mode">>(({ theme, theme_mode }) => {
  return {
    "&": {
      width: "100%",
    },
  };
});

type positions = "left" | "right" | "top" | "bottom";

interface CommonNavProps {
  navList: mainNavList[];
  position: positions;
  children?: ReactNode;
}

interface mainNavList {
  url: any;
  text: string | ReactNode;
  icon: ReactNode;
  class: string;
}

interface anchorState {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

const CommonNav = ({ navList, position, children, ...porops }: CommonNavProps) => {
  const themeMode = usePaletteMode();
  const dispatch = useDispatch();
  const [openHoldBolean, setOpenHoldBolean] = useState(false);

  const drawerAnchor = useSelector((state: RootState) => {
    return state.drawerAnchor.value;
  });

  const setDrawerAnchor = (data: anchorState) => {
    dispatch(changeDrawer(data));
  };

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
    // setOpenHoldBolean((prev) => !prev);
    let drawerAnchorCopy = { ...drawerAnchor };
    let anchor = drawerAnchorCopy[position];
    setDrawerAnchor({ ...drawerAnchorCopy, [position]: !anchor });
  };

  const backgroundClick = (e: React.MouseEvent) => {
    let drawerAnchorCopy = { ...drawerAnchor };
    setDrawerAnchor({ ...drawerAnchorCopy, [position]: false });
  };

  const readyMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <InnerNav className={"globalNav" + (!drawerAnchor[position] ? "" : " open")} direction={position} theme_mode={themeMode}>
      <StyledBox display={drawerAnchor[position] ? "block" : "none"} onClick={backgroundClick} style={{ [position]: 0 }}></StyledBox>
      <div className={"globalNavInner"}>
        {/* <header className={"navHeader"}>
            <a href="#" onClick={expandClick}>
              <i className={"navIcon"}>{position == "left" ? <MenuIcon sx={iconStyle} /> : <ManageAccountsIcon sx={iconStyle} />}</i>
            </a>
          </header> */}
        {children}
        <ul>
          {navList.map((item, idx) => {
            let text = item.text;
            let icon = item.icon;
            let url = item.url;

            return (
              <li key={idx} className={item.class}>
                <>
                  <Link to={url} onClick={(e) => (url !== "#" ? readyMenuClick(e) : null)}>
                    <i className={"navIcon"}>{icon}</i> <span className={"navText"}>{text}</span>
                  </Link>
                </>
              </li>
            );
          })}
        </ul>
        <footer>
          <Divider light />
          <a href="#" onClick={expandClick}>
            <i className={"navIcon"}>
              {position == "left" ? (
                !drawerAnchor[position] ? (
                  <AlignHorizontalRightRoundedIcon sx={iconStyle} />
                ) : (
                  <AlignHorizontalLeftRoundedIcon sx={iconStyle} />
                )
              ) : !drawerAnchor[position] ? (
                <AlignHorizontalLeftRoundedIcon sx={iconStyle} />
              ) : (
                <AlignHorizontalRightRoundedIcon sx={iconStyle} />
              )}
            </i>
            <span className={"navText"}>{!drawerAnchor[position] ? "확장하기" : "접기"}</span>
          </a>
        </footer>
      </div>
    </InnerNav>
  );
};

export default CommonNav;
