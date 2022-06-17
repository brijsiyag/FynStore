import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useDispatch } from "react-redux";
import { addShop, updateShop } from "../../../features/shop/shopSlice";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Icon from "./addShopSvg.svg";

const useStyles = makeStyles((theme) => ({
  addStoreFormContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function AddUpdateShop({ data, setIsModal }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  if (data === undefined) {
    data = {};
  }
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(data).length === 0) {
      dispatch(addShop(formData));
    } else {
      dispatch(updateShop(formData));
    }
    setIsModal();
  };

  const setStoreName = (e) => {
    setFormData({ ...formData, store_name: e.target.value });
    if (!/^[A-Za-z\s]*$/.test(e.target.value)) {
      setError({
        ...error,
        store_name: "Please Enter a Valid Name",
      });
    } else {
      setError((pre) => {
        delete pre["store_name"];
        return pre;
      });
    }
  };

  const setCategory = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const setArea = (e) => {
    setFormData({ ...formData, area: e.target.value });
  };

  const setOpeningDate = (e) => {
    if (dayjs(formData.closing_date) < dayjs(e)) {
      setError({
        ...error,
        closing_date: "Can't be before Opening Date",
      });
    } else {
      setError((pre) => {
        delete pre["closing_date"];
        return pre;
      });
    }
    setFormData({ ...formData, opening_date: e });
  };

  const setClosingDate = (e) => {
    if (dayjs(e) < dayjs(formData.opening_date)) {
      setError({
        ...error,
        closing_date: "Can't be before Opening Date",
      });
    } else {
      setError((pre) => {
        delete pre["closing_date"];
        return pre;
      });
    }
    setFormData({ ...formData, closing_date: e });
  };

  const CATEGORY_DATA = [
    "Grocery",
    "Butcher",
    "Baker",
    "Chemist",
    "Stationery shop",
  ];
  const AREAS = [
    "Pune",
    "Thane",
    "Mumbai Suburban",
    "Nashik",
    "Nagpur",
    "Ahmednagar",
  ];

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.addStoreFormContainer}>
        <Box component="img" mb={2} width={50} src={Icon} alt="add shop" />
        <Typography component="h1" variant="h5">
          {Object.keys(data).length === 0 ? "Add" : "Update"} Shop
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            Object.keys(error).length === 0 && handleSubmit(e);
          }}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="store-name"
                name="store_name"
                required
                fullWidth
                id="store_name"
                label="Store Name"
                autoFocus
                defaultValue={formData.store_name || ""}
                error={error.store_name !== undefined}
                helperText={error.store_name}
                onChange={setStoreName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth className="drawer-dropdown-content">
                <InputLabel id="category-label">Category*</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  label="Category"
                  required
                  value={formData.category}
                  onChange={setCategory}
                >
                  {CATEGORY_DATA.map((item, index) => (
                    <MenuItem
                      value={item}
                      style={{ textTransform: "capitalize" }}
                      key={index}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {formData.category === undefined && (
                  <FormHelperText>Select Category</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth className="drawer-dropdown-content">
                <InputLabel id="area-label">Area*</InputLabel>
                <Select
                  labelId="area-label"
                  id="area-select"
                  label="Area"
                  required
                  value={formData.area}
                  onChange={setArea}
                >
                  {AREAS.map((item, index) => (
                    <MenuItem
                      value={item}
                      style={{ textTransform: "capitalize" }}
                      key={index}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {formData.area === undefined && (
                  <FormHelperText>Select Area</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DesktopDatePicker
                label="Opening Date"
                inputFormat="MM/DD/YYYY"
                value={formData.opening_date || dayjs()}
                onChange={setOpeningDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={error.opening_date !== undefined}
                    helperText={error.opening_date}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DesktopDatePicker
                label="Closing Date"
                inputFormat="MM/DD/YYYY"
                value={formData.closing_date || dayjs()}
                onChange={setClosingDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={error.closing_date !== undefined}
                    helperText={error.closing_date}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {Object.keys(data).length === 0 ? "Add" : "Update"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
