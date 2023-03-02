import React, { useState, ReactNode } from "react";

import { RootState } from "../stores/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../stores/slices/counterSlice";
import { chanageDrawer } from "../stores/slices/drawerAnchorSlice";

import { styled } from "@mui/material/styles";

// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

import { Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Container } from "@mui/material";

// import { InboxIcon, MailIcon } from '@mui/icons-material';

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import MainNav from "@/components/shared/MainNav";
import MyNav from "@/components/shared/MyNav";
import SearchBox from "@/components/shared/SearchBox";
import CardContents from "@/components/layout/CardContents";

const SimplePaper = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
};

type Anchor = "top" | "left" | "bottom" | "right";

const MainContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: "flex-start",
  // background: "#cfe8fc",
  width: "60vw",
  margin: "0 auto",
});

const TemporaryDrawer = () => {
  const drawerState = useSelector((state: RootState) => state.drawer.value);
  const dispatch = useDispatch();

  console.log("drawerState", drawerState);

  const toggleDrawer = (anchor: Anchor | string, openState: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    console.log(anchor, openState, event);
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    console.log("change");

    dispatch(chanageDrawer({ ...drawerState, [anchor]: openState }));
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={drawerState[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

interface MainComponentProps {
  children?: ReactNode;
}

const animals = [
  {
    url: "/img/Peacock.jpg",
    title: "Peacock",
    width: "33.3333%",
  },
  {
    url: "/img/Koala.jpg",
    title: "Koala",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
];

const animals2 = [
  {
    url: "/img/Peacock.jpg",
    title: "Peacock",
    width: "33.3333%",
  },
  {
    url: "/img/Koala.jpg",
    title: "Koala",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/Peacock.jpg",
    title: "Peacock",
    width: "33.3333%",
  },
  {
    url: "/img/Koala.jpg",
    title: "Koala",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
  {
    url: "/img/cat-7762887_1920.jpg",
    title: "Cat",
    width: "33.3333%",
  },
];

const Main = ({ children }: MainComponentProps) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const drawerState = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch();

  return (
    <>
      <MainNav />
      <MyNav />
      <MainContainer>
        <SearchBox />
        <CardContents images={animals} columnNum={4} spacing={1} height={20} />
        <CardContents images={animals2} columnNum={3} spacing={1} height={25} />
      </MainContainer>

      {children}
    </>
  );
};

export default Main;
