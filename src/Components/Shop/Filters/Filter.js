import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter, setFilter } from "../../../features/util/utilSlice";
import FilterForm from "./FilterForm";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Filter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((store) => {
    return store.util;
  });
  return (
    <>
      <Grid
        height="100%"
        container
        overflow="scroll"
        flexDirection="column"
        padding={2}
      >
        <Grid
          item
          container
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={2}
          fontWeight="bold"
          flexBasis={10}
        >
          <Grid item alignContent="center">
            <Grid container>
              <Grid item>
                <FilterAltIcon color="secondary" />
              </Grid>
              <Grid item lineHeight={1.5}>
                Filter By
              </Grid>
            </Grid>
          </Grid>
          <Box
            color="primary.main"
            sx={{
              cursor: "pointer",
              "&:active": {
                transform: "scale(0.99)",
              },
            }}
            onClick={() => {
              dispatch(clearFilter({ type: "Category" }));
              dispatch(clearFilter({ type: "Area" }));
              dispatch(setFilter({ type: "Status", value: "all" }));
            }}
            lineHeight={1.5}
          >
            Reset Filters
          </Box>
        </Grid>
        <Divider />
        <Grid
          item
          marginTop={2}
          overflow="scroll"
          flexBasis="90%"
          // display={{ xs: "none", sm: "initial" }}
        >
          <Box sx={{ fontSize: "1rem", fontWeight: "500", color: "gray" }}>
            Status
          </Box>
          <Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  onClick={() =>
                    dispatch(setFilter({ type: "Status", value: "all" }))
                  }
                  value="all"
                  checked={filters["Status"] === "all"}
                  control={<Radio />}
                  label="All"
                />
                <FormControlLabel
                  onClick={() =>
                    dispatch(setFilter({ type: "Status", value: "Open" }))
                  }
                  checked={filters["Status"] === "Open"}
                  value="open"
                  control={<Radio />}
                  label="Open"
                />
                <FormControlLabel
                  onClick={() =>
                    dispatch(setFilter({ type: "Status", value: "Close" }))
                  }
                  checked={filters["Status"] === "Close"}
                  value="close"
                  control={<Radio />}
                  label="Close"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box marginTop={2}>
            <FilterForm
              name="Category"
              items={[
                "Grocery",
                "Butcher",
                "Baker",
                "Chemist",
                "Stationery shop",
              ]}
            />
          </Box>
          <Box marginTop={2}>
            <FilterForm
              name="Area"
              items={[
                "Thane",
                "Pune",
                "Mumbai Suburban",
                "Nashik",
                "Nagpur",
                "Ahmednagar",
                "Solapur",
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Filter;
