"use client";
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import SettingsIcon from "@mui/icons-material/Settings";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../../public/avatar_image.png"

import { useRouter } from "next/navigation";

const drawerWidth = 250;
const drawerWidth2 = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    marginRight: drawerWidth,
    width: `calc(100% - 500px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const [openRight, setOpenRight] = React.useState(true);

  const router = useRouter();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleDrawer2 = () => {
    setOpenRight(!openRight);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} elevation={0} color="transparent">
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            EZQanoon
          </Typography>
          <IconButton color="inherit">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { backgroundColor: "#F0F4F9", border: "none" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90vh",
            mx: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon fontSize="large" />}
              disableElevation
              size="large"
              fullWidth
              sx={{
                borderRadius: 10,
                backgroundColor: "#dde3ea",
                color: "#444739",
                padding: "10px",
              }}
            >
              New Chat
            </Button>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, mt: 2 }}
            >
              Recent
            </Typography>

            <List>
              <ListItemButton
                sx={{ backgroundColor: "transparent", borderRadius: 5 }}
              >
                <ListItemIcon>
                  <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText secondary="Hello" />
              </ListItemButton>
              <ListItemButton
                sx={{ backgroundColor: "transparent", borderRadius: 5 }}
              >
                <ListItemIcon>
                  <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText secondary="Hello" />
              </ListItemButton>
            </List>
          </Box>
          <Box sx={{ alignItems: "flex-end" }}>
            <List>
              <ListItemButton
                sx={{ backgroundColor: "transparent", borderRadius: 5 }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText secondary="Settings" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      >
        <Toolbar />
        {children}
      </Box>

      <Drawer
        anchor="right"
        variant="permanent"
        open={openRight}
        PaperProps={{ sx: { backgroundColor: "#F0F4F9", border: "none" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer2}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "90vh",
            mx: 2,
          }}
        >
          <Image
            src={avatar}
            
            width={220}
            alt="Picture of the avatar"
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default DashboardLayout;
