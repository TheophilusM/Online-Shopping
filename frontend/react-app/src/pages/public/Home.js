import "../../styles/home.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AppBar, DrawerHeader, Main } from "../../handlers/drawerHandlers";
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  Box,
  Drawer,
  Button,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { AccountTree, Folder, Home, Settings } from "@mui/icons-material";

const drawerWidth = 240;
export default function DailyTask() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("image", file, file.name);
    console.log(formData);
    setFile("");
    setUploaded(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#2E353C" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ ml: 2, mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              TaskTracker
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ mr: 1, width: 32, height: 32, fontSize: 14 }}>
                NB
              </Avatar>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  style={{ color: "rgba(236,236, 236, 0.7)", fontSize: "12px" }}
                >
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem
              className="active-page"
              style={{ backgroundColor: "#4d555c" }}
              button
            >
              <ListItemIcon>
                <Home style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"Dashboard"} />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountTree />
            </ListItemIcon>
            <ListItemText primary={"Daily Tasks"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <p>Upload Image</p>
        <div>
          <input
            type="file"
            name="file"
            id=""
            onChange={(e) => handleFile(e)}
          />
          <button onClick={uploadFile()}></button>
        </div>
        <img src={file} alt="" sizes="200px" srcset="#2E353C" />
      </Main>
    </Box>
  );
}
