import React, { useState, ReactNode } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { changePaletteMode } from "@/stores/slices/paletteModeSlice";

import { ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import CommonNav from "../layout/CommonNav";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

type mode = "dark" | "light" | "system";

interface styleProps {
  theme_mode: string;
}

const ThemeToggleButtonTitle = styled(Typography)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      color: theme_mode == "light" ? variables.navBackColor : variables.navDarkColor,
      fontSize: `calc(${variables.headerFontSize} - 3px)`,
      marginBottom: "2px",
      fontWeight: "bold",
    },
  };
});

const ThemeToggleButtonGroup = styled(ToggleButtonGroup)<styleProps>(({ theme, theme_mode }) => {
  return {
    "&": {
      display: "inline-flex",
      borderRadius: "4px",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      "& .MuiButtonBase-root": {
        width: "calc(100% / 3)",
        border: `1px solid ${theme_mode == "light" ? variables.navDarkColor + "50" : variables.emWhite + "30"}`,
        "&.MuiToggleButton-root": {
          color: theme_mode == "light" ? variables.navDarkColor : variables.navDarkColor,
          backgroundColor: theme_mode == "light" ? variables.emWhite : variables.navBackColor,
          "&.Mui-selected": {
            color: theme_mode == "light" ? variables.darkBlue : variables.emWhite,
            backgroundColor: theme_mode == "light" ? variables.navDarkColor + "60" : variables.emWhite + "25",
          },
        },
      },
    },
  };
});

const ColorToggleButton = () => {
  const themeMode = usePaletteMode();
  const dispatch = useDispatch();

  const paletteMode = useSelector((state: RootState) => {
    return state.paletteMode.value;
  });

  const setPaletteMode = (data: mode) => {
    dispatch(changePaletteMode(data));
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) {
      setPaletteMode(newAlignment as mode);
    }
  };

  return (
    <>
      <ThemeToggleButtonTitle theme_mode={themeMode}>MODE SELECT</ThemeToggleButtonTitle>
      <ThemeToggleButtonGroup
        theme_mode={themeMode}
        color="primary"
        value={paletteMode}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        fullWidth={true}
      >
        <ToggleButton value="light" size={"small"}>
          <Tooltip title="Light">
            <LightModeOutlinedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="system" size={"small"}>
          <Tooltip title="System">
            <SettingsBrightnessOutlinedIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="dark" size={"small"}>
          <Tooltip title="Dark">
            <DarkModeOutlinedIcon />
          </Tooltip>
        </ToggleButton>
      </ThemeToggleButtonGroup>
    </>
  );
};

const PersonalNav = () => {
  const drawerAnchor = useSelector((state: RootState) => {
    return state.drawerAnchor.value;
  });

  interface myNavList {
    text: string | ReactNode;
    icon: ReactNode;
    url: string;
    class: string;
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
      text: <ColorToggleButton />,
      icon: drawerAnchor.right ? null : <SettingsIcon sx={iconStyle} />,
      url: "#",
      class: "compo",
    },
    {
      text: "계정 생성",
      icon: <PersonAddIcon sx={iconStyle} />,
      url: "#",
      class: "",
    },
    {
      text: "검색 기록",
      icon: <PendingActionsIcon sx={iconStyle} />,
      url: "#",
      class: "",
    },
  ];

  // const expandClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setOpenHoldBolean((prev) => !prev);
  // };

  return (
    <>
      <CommonNav navList={myNavList} position={"right"}>
        <a className={"navHead"} href="/account" onClick={(e) => e.preventDefault()}>
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
