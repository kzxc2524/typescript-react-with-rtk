import React, { useState, useEffect } from "react";
const _ = require("lodash");

interface windowSize {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const resize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const resizeDebounce = _.debounce(resize, 300);

    window.addEventListener("resize", resizeDebounce);

    resizeDebounce();

    return () => window.removeEventListener("resize", resizeDebounce);
  }, []);

  return windowSize;
};

export default useWindowSize;
