import { Grid, Input } from "@mui/material";
import React from "react";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../../features/util/utilSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => {
    return store.util;
  });
  return (
    <>
      <Grid
        container
        justifyContent={{ xs: "center", md: "space-between" }}
        flexDirection={{ xs: "column", md: "row" }}
        padding={1}
      >
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          item
          marginBottom={{ xs: 2, sm: 2, md: 0 }}
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          <img src={logo} alt="logo" width="30px" />
          <Box component="span" color="primary.main" sx={{ marginLeft: "4px" }}>
            Fyn
          </Box>
          <Box component="span" color="secondary.main">
            Tune
          </Box>
        </Grid>
        <Grid
          item
          lg={4}
          xs={10}
          backgroundColor="rgb(0,0,0,0.05)"
          sx={{
            borderRadius: "3px",
          }}
          padding={1}
          marginX="auto"
          flexGrow={1}
          marginBottom={{ xs: 2, sm: 2, md: 0 }}
          width="100%"
        >
          <Box
            sx={{
              padding: "1px 4px",
            }}
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Search htmlColor="gray" />
            <Input
              onChange={(e) => {
                dispatch(setSearchText(e.target.value));
              }}
              value={searchText}
              placeholder="Search Shops Here"
              style={{
                backgroundColor: "rgb(0,0,0,0)",
                outline: "none",
                border: "none",
                flexGrow: "1",
                height: "91%",
                fontSize: "1rem",
              }}
            />
            <ClearIcon
              htmlColor="gray"
              sx={{
                "&:hover": {
                  color: "#FF5733",
                  cursor: "pointer",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
              onClick={() => {
                dispatch(setSearchText(""));
              }}
            />
          </Box>
        </Grid>

        <Grid item>
          <Grid
            container
            flexDirection="row"
            lineHeight={3}
            alignItems="center"
            justifyContent="space-between"
            minWidth={150}
            display={{ xs: "none", lg: "flex" }}
          >
            <Grid item>
              <Box
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:active": {
                    transform: "scale(0.99)",
                  },
                }}
              >
                Register
              </Box>
            </Grid>
            <Grid item>
              <Box
                color="primary.main"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:active": {
                    transform: "scale(0.99)",
                  },
                }}
              >
                Log in
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
