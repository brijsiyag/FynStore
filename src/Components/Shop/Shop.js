import React from "react";
import { Divider, Grid } from "@mui/material";
import Header from "./Header/Header";
import Filter from "./Filters/Filter";
import ShopBody from "./ShopBody/ShopBody";
import Modal from "../Modal";
import Footer from "./Footer/Footer";

const ShopList = () => {
  return (
    <>
      <Header />
      <Divider />
      <Grid container>
        <Grid
          display={{ xs: "none", md: "initial" }}
          boxSizing="border-box"
          maxHeight="90vh"
          item
          lg={3}
          md={3}
          sm={3}
          xs={12}
          xl={3}
        >
          <Filter />
        </Grid>
        <Grid
          boxSizing="border-box"
          height="90vh"
          item
          lg={9}
          md={9}
          xs={12}
          xl={9}
          sm={12}
        >
          <ShopBody />
        </Grid>
      </Grid>
      <Footer />
      <Modal />
    </>
  );
};

export default ShopList;
