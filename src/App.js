import React from "react";
import ShopList from "./Components/Shop/Shop";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgb(94,180,180)",
      opaque: "rgb(94,180,180,0.1)",
    },
    secondary: {
      main: "rgb(50,115,115)",
      opaque: "rgb(50,115,115,0.5)",
    },
  },
});
theme = responsiveFontSizes(theme);
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <ShopList />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
