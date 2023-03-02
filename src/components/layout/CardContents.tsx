import React, { useState, useRef } from "react";

import { Box, Paper, Typography, ButtonBase } from "@mui/material";

import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "50px",
  };
});

const Elevation = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 150,
  },
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
}));

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

interface images {
  url: string;
  title: string;
  width: string;
}

interface CardContentProps {
  images: images[];
  columnNum: number;
  spacing: number;
  height: number;
}

const CardContents = ({ images, columnNum, spacing, height }: CardContentProps) => {
  columnNum = columnNum;
  spacing = spacing; //%
  const margin: number = (columnNum - 1) * spacing;
  const imageWidth: number = (100 - margin) / columnNum;
  const imageHeight: number = height;

  return (
    <>
      <StyledBox>
        {images.map((image, idx) => (
          <ImageButton
            focusRipple
            key={image.title}
            onClick={(e: React.MouseEvent) => {
              console.log(e);
            }}
            style={{
              width: imageWidth + "%",
              height: imageHeight + "rem",
              margin: (idx + 1) % columnNum ? `0 ${spacing + "%"} ${spacing + "%"} 0` : 0,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
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
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </StyledBox>
    </>
  );
};

CardContents.defaultProps = {
  columnNum: 4,
  spacing: 1,
  height: 25,
};

export default CardContents;
