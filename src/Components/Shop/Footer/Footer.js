import { Box, Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height={50}
      width="100vw"
      bgcolor="secondary.opaque"
    >
      <Grid item>@2022 Copyright: FynTune.com</Grid>
    </Grid>
  );
};

export default Footer;
