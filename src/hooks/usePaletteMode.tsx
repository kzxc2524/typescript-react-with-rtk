import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";

import { changePaletteMode } from "@/stores/slices/paletteModeSlice";
import { changeThemeMode } from "@/stores/slices/themeModeSlice";

type mode = "dark" | "light";

const usePaletteMode = () => {
  const dispatch = useDispatch();

  const paletteMode = useSelector((state: RootState) => {
    return state.paletteMode.value;
  });

  const themeeMode = useSelector((state: RootState) => {
    return state.themeMode.value;
  });

  const setThemeMode = (data: mode) => {
    dispatch(changeThemeMode(data));
  };

  const changeSheme = (matches: boolean): void => {
    const colorScheme = matches ? "dark" : "light";
    setBodyTheme(colorScheme);
    setThemeMode(colorScheme);
  };

  const setBodyTheme = (theme: mode) => {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    html?.setAttribute("data-theme", theme);
    body?.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    // console.log(sessionStorage);

    // const theme = sessionStorage.getItem("theme");
    // console.log(paletteMode);
    if (paletteMode !== "system") {
      setBodyTheme(paletteMode);
      return setThemeMode(paletteMode);
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e: MediaQueryListEvent) => changeSheme(e.matches));

    changeSheme(window.matchMedia("(prefers-color-scheme: dark)").matches);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", () => {});
    };
  }, [paletteMode]);

  return themeeMode;
};

export default usePaletteMode;
