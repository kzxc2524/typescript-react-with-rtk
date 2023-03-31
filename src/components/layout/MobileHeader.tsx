import React, { ReactNode } from "react";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { changeDrawer } from "@/stores/slices/drawerAnchorSlice";

import { Theme } from "@mui/material";

import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DiamondIcon from "@mui/icons-material/Diamond";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface styleProps {
  theme_mode: string;
}

const StyledMobileHeader = styled("nav")(({ theme }) => {
  return {
    display: "none",
    width: "100vw",
    [theme.breakpoints.down(1024)]: {
      display: "flex",
      position: "fixed",
      zIndex: "500",
      background: variables.shallowBlack,
    },
  };
});

const StyledMobileHeaderWrap = styled("ul")(({ theme }) => {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
});

const StyledMobileHeaderlist = styled("li")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
  };
});

const StyledMobileHeaderA = styled("a")(({ theme }) => {
  return {
    display: "inline-block",
    padding: "8px 10px",
    boxSizing: "border-box",
  };
});

const iconStyle = ({ theme }: { theme: Theme }) => {
  return {
    [theme.breakpoints.down(1024)]: {
      "&": {
        display: "flex",
        color: variables.coldGrey,
      },
      "&:hover": {
        color: variables.navHovertColor,
      },
    },
  };
};

const StyledMobileMenuIcon = styled(MenuIcon)(iconStyle);

const StyledMobileManageAccountsIcon = styled(ManageAccountsIcon)(iconStyle);

const StyledMobileHeaderTitleIcon = styled("i")(({ theme }) => {
  return {
    "& > svg": {
      transition: theme.transitions.create(["width", "height"]),
    },

    [theme.breakpoints.down(260)]: {
      "& > svg": {
        width: "0.95rem",
        height: "0.95rme",
      },
    },
  };
});

const StyledMobileHeaderTitle = styled("span")(({ theme }) => {
  return {
    color: "#ececec",
    fontSize: "1.3rem",
    whiteSpace: "nowrap",
    transition: theme.transitions.create(["font-size"]),
    [theme.breakpoints.down(260)]: {
      fontSize: "0.95rem",
    },
  };
});

type positions = "left" | "right" | "top" | "bottom";

interface anchorState {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

interface MobileHeaderProps {
  children?: ReactNode;
}

const MobileHeader = ({ children }: MobileHeaderProps) => {
  const dispatch = useDispatch();

  const drawerAnchor = useSelector((state: RootState) => {
    return state.drawerAnchor.value;
  });

  const setDrawerAnchor = (data: anchorState) => {
    dispatch(changeDrawer(data));
  };

  const expandClick = (e: React.MouseEvent, position: positions) => {
    e.preventDefault();
    // setOpenHoldBolean((prev) => !prev);
    let drawerAnchorCopy = { ...drawerAnchor };
    let anchor = drawerAnchorCopy[position];
    setDrawerAnchor({ ...drawerAnchorCopy, [position]: !anchor });
  };

  return (
    <StyledMobileHeader>
      <StyledMobileHeaderWrap>
        <StyledMobileHeaderlist>
          <StyledMobileHeaderA href="#" onClick={(e) => expandClick(e, "left")}>
            <StyledMobileMenuIcon />
          </StyledMobileHeaderA>
        </StyledMobileHeaderlist>
        <StyledMobileHeaderlist>
          <Link to={"/"}>
            <h1 className={"navHead"} style={{ display: "flex", alignItems: "center" }}>
              <StyledMobileHeaderTitleIcon className={"navIcon"}>
                <DiamondIcon style={{ color: "red", display: "flex", alignItems: "center" }} />
              </StyledMobileHeaderTitleIcon>
              <StyledMobileHeaderTitle className={"navText noto600"}>PUM SUPPORT</StyledMobileHeaderTitle>
            </h1>
          </Link>
        </StyledMobileHeaderlist>
        <StyledMobileHeaderlist>
          <StyledMobileHeaderA href="#" onClick={(e) => expandClick(e, "right")}>
            <StyledMobileManageAccountsIcon />
          </StyledMobileHeaderA>
        </StyledMobileHeaderlist>
      </StyledMobileHeaderWrap>
    </StyledMobileHeader>
  );
};

export default MobileHeader;
