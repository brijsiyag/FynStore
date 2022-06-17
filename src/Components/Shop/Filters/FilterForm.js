import React from "react";
import { FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  removeFilter,
  setFilter,
} from "../../../features/util/utilSlice";

const FilterForm = ({ name, items }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => {
    return state.util;
  });
  const handleFilter = (checked, value) => {
    if (checked) {
      dispatch(setFilter({ type: name, value: value }));
    } else {
      dispatch(removeFilter({ type: name, value: value }));
    }
  };
  return (
    <>
      <Box
        marginBottom={1}
        sx={{ fontSize: "1rem", fontWeight: "500", color: "gray" }}
      >
        {name}
      </Box>
      <Box fontSize={20}>
        <FormGroup>
          <RadioGroup defaultValue="all">
            <FormControlLabel
              value="all"
              checked={filters[name].length === 0}
              onClick={() => {
                dispatch(clearFilter({ type: name }));
              }}
              control={<Radio />}
              label="All"
            />
          </RadioGroup>
          {items.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onClick={(e) => {
                      handleFilter(e.target.checked, item);
                    }}
                    checked={filters[name].includes(item)}
                    inputProps={{ "aria-label": "controlled" }}
                    value={true}
                    sx={{
                      outline: "none",
                      border: "none",
                      "&:active": {
                        transform: "scale(0.9)",
                      },
                    }}
                    icon={
                      <CheckBoxOutlineBlankIcon sx={{ color: "darkgray" }} />
                    }
                    focusRipple={false}
                    disableRipple
                  />
                }
                label={item}
              />
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
};

export default FilterForm;
