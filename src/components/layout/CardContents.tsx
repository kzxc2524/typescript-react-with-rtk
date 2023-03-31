import React, { useState, useEffect, useRef } from "react";

import { Box, Paper, Typography, ButtonBase } from "@mui/material";

import { styled } from "@mui/material/styles";
import useWindowSize from "@/hooks/useWIndowSize";

import variables from "@/css/_variables.module.scss";

import usePaletteMode from "@/hooks/usePaletteMode";

interface styleProps {
  theme_mode: string;
}

interface ImageButtonProps {
  is_wrap: number;
  column_num: number;
  spacing: number;
  idx: number;
  min_width: number;
}

const ContentWarp = styled(Box)<styleProps>(({ theme, theme_mode }) => {
  return {
    marginTop: "300px",
    width: "100%",

    "&.MuiBox-root": {
      "& .MuiTypography-root": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .subContentsTitle": {
          display: "block",
          color: theme_mode == "light" ? variables.shallowBlack : variables.emWhite,
          fontWeight: theme_mode == "light" ? "bold" : "normal",
          fontSize: "1.2rem",
          marginBottom: 0,
          textAlign: "center",
          whiteSpace: "nowrap",
        },
        "& .mainContentsTitle": {
          color: theme_mode == "light" ? variables.shallowBlack : variables.emWhite,
          fontSize: "1.8rem",
          marginBottom: "30px",
          whiteSpace: "nowrap",
        },
      },
    },
    [theme.breakpoints.down(300)]: {
      "&.MuiBox-root": {
        "& .MuiTypography-root": {
          "& .subContentsTitle": {
            fontSize: "1rem",
          },
          "& .mainContentsTitle": {
            fontSize: "1.6rem",
          },
        },
      },
    },
    [theme.breakpoints.down(250)]: {
      "&.MuiBox-root": {
        "& .MuiTypography-root": {
          "& .mainContentsTitle": {
            fontSize: "1.4rem",
          },
        },
      },
    },
    [theme.breakpoints.down(220)]: {
      "&.MuiBox-root": {
        "& .MuiTypography-root": {
          "& .mainContentsTitle": {
            fontSize: "1.2rem",
          },
        },
      },
    },
  };
});

const StyledBox = styled(Box)<Pick<ImageButtonProps, "is_wrap">>(({ theme, is_wrap }) => {
  return {
    display: "flex",
    flexWrap: is_wrap ? "nowrap" : "wrap",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    overflowX: "auto",
    [theme.breakpoints.down(1024)]: is_wrap
      ? {
          "&": {
            flexWrap: "nowrap",
          },
        }
      : {
          "&": {
            flexWrap: "wrap",
          },
        },
  };
});

const ImageButton = styled(ButtonBase)<ImageButtonProps>(({ theme, is_wrap, column_num, spacing, idx, min_width }) => {
  const calcWidth = (colNum: number, mr: number): { margin: number; imageWidth: number } => {
    const margin: number = (colNum - 1) * mr;
    const imageWidth: number = (100 - margin) / colNum;

    return { margin, imageWidth };
  };

  const { margin, imageWidth } = calcWidth(column_num, spacing);

  return {
    position: "relative",
    borderRadius: "0.5rem",
    overflow: "hidden",
    width: `${imageWidth}%`,
    minWidth: is_wrap ? min_width + "px" : "initial",
    aspectRatio: "1 / 1",
    marginRight: (idx + 1) % column_num !== 0 ? (is_wrap ? `max(${spacing + "%"}, 10px)` : spacing + "%") : 0,
    marginBottom: `${spacing + "%"}`,

    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      boxShadow: "0px 0px 10px 10px #4c4c4c20",
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
    [theme.breakpoints.down(1024)]: is_wrap
      ? {
          "&": {
            marginRight: (idx + 1) / column_num !== 1 ? `max(${spacing + "%"}, 10px)` : 0,
          },
        }
      : {
          "&": {
            width: calcWidth(3, spacing)["imageWidth"] + "%",
            marginRight: (idx + 1) % 3 !== 0 ? `${spacing + "%"}` : 0,
          },
        },
    [theme.breakpoints.down(640)]: {
      "&": {
        width: calcWidth(2, spacing)["imageWidth"] + "%",
        marginRight: (idx + 1) % 2 !== 0 ? `${spacing + "%"}` : 0,
      },
    },
    [theme.breakpoints.down(420)]: {
      "&": {
        width: calcWidth(1, spacing)["imageWidth"] + "%",
        marginRight: (idx + 1) % 1 !== 0 ? `${spacing + "%"}` : 0,
      },
    },
  };
});

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 0",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: 0,
  right: 0,
  margin: "auto",
  transition: theme.transitions.create("opacity"),
}));

interface GoodsData {
  category: string | string[];
  state: string;
  region: string;
  image: string;
  link: string;
  name: string;
  price: string;
  soldOut: boolean;
  taxType: string;
}

interface CardContentProps {
  images: GoodsData[];
  columnNum: number;
  spacing: number;
}

const CardElems = ({ images, columnNum, spacing }: CardContentProps) => {
  const containerRef = useRef<HTMLElement>(null);
  // const { width, height } = useWindowSize();

  const containerWidth = containerRef.current?.clientWidth as number;
  // columnNum = columnNum;
  // spacing = spacing; //%
  const margin: number = (columnNum - 1) * (containerWidth * (spacing / 100));
  // const imageWidth: number = (100 - margin) / columnNum;
  // const imageHeight: number = custonHeight;
  const isWrap = Number(images.length / columnNum == 1);
  const minWidth = 200;

  const breakPoint = columnNum * minWidth;

  return (
    <>
      {images.map((image, idx) => (
        <ImageButton
          focusRipple
          key={image.name + idx}
          onClick={(e: React.MouseEvent) => {
            console.log(e);
          }}
          is_wrap={isWrap}
          column_num={columnNum}
          spacing={spacing}
          idx={idx}
          min_width={minWidth}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.image})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: "relative",
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.name.replace(/\[[^\]]*\]\s*/g, "")}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </>
  );
};

const CardContents = ({ images, columnNum, spacing }: CardContentProps) => {
  const themeMode = usePaletteMode();

  const containerRef = useRef<HTMLElement>(null);
  // const { width, height } = useWindowSize();

  const containerWidth = containerRef.current?.clientWidth as number;
  // columnNum = columnNum;
  // spacing = spacing; //%
  const margin: number = (columnNum - 1) * (containerWidth * (spacing / 100));
  // const imageWidth: number = (100 - margin) / columnNum;
  // const imageHeight: number = custonHeight;
  const isWrap = Number(images.length / columnNum == 1);
  const minWidth = 200;

  const breakPoint = columnNum * minWidth;

  return (
    <ContentWarp theme_mode={themeMode}>
      <Typography>
        <span className={"subContentsTitle noto300"}>품서폿에서 찾자!</span>
        <span className={"mainContentsTitle noto700"}>당신이 지나친 답례품!!</span>
      </Typography>
      <StyledBox is_wrap={isWrap} ref={containerRef} className={"scrollCustom"}>
        <CardElems images={images} columnNum={columnNum} spacing={spacing} />
      </StyledBox>
    </ContentWarp>
  );
};

CardContents.defaultProps = {
  columnNum: 4,
  spacing: 1,
  height: 25,
};

export default CardContents;
