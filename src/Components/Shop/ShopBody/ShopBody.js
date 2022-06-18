import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { selectShops } from "../../../features/shop/shopSlice";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {
  clearFilter,
  setFilter,
  setModalContent,
  toggleModal,
} from "../../../features/util/utilSlice";
import Filter from "../Filters/Filter";
import AddUpdateShop from "../Forms/AddUpdateShop";
import ShopCard from "./ShopCard";

const ShopBody = () => {
  const dispatch = useDispatch();
  const [localShops, setLocalShops] = useState([]);
  let shops = useSelector(selectShops);
  const { filters, searchText } = useSelector((state) => {
    return state.util;
  });
  useEffect(() => {
    setLocalShops(shops);
    const checkFilter = (filter, value) => {
      if (filters[filter].length === 0) {
        return true;
      } else {
        return filters[filter].includes(value);
      }
    };

    const checkSearchText = (name) => {
      return name.toLowerCase().search(searchText.toLowerCase()) !== -1;
    };
    setLocalShops((pre) => {
      return pre.filter((item) => {
        return (
          checkFilter("Category", item.category) &&
          checkFilter("Area", item.area) &&
          (filters["Status"] === "all" || filters["Status"] === item.status) &&
          checkSearchText(item.store_name)
        );
      });
    });
  }, [shops, filters, searchText]);

  return (
    <>
      <Grid container flexDirection="column" height="100%" flexWrap="nowrap">
        <Grid
          item
          justifyContent={{ xs: "space-around", md: "space-between" }}
          flexBasis={45}
          alignContent="center"
          padding={1}
        >
          <Grid
            container
            justifyContent={{ xs: "space-evenly", md: "space-between" }}
          >
            <Grid item display={{ md: "none" }}>
              <Button
                color="secondary"
                onClick={() => {
                  dispatch(setModalContent(Filter));
                  dispatch(toggleModal());
                }}
                variant="contained"
                startIcon={<FilterAltIcon />}
              >
                Filters
              </Button>
            </Grid>

            <Grid
              item
              display={{ xs: "none", md: "initial" }}
              color="gray"
              lineHeight={2}
            >
              {searchText !== ""
                ? `Showing result for "${searchText}"`
                : "Nothing to Search"}
            </Grid>

            <Grid item>
              <Button
                onClick={() => {
                  dispatch(setModalContent(AddUpdateShop));
                  dispatch(toggleModal());
                }}
                variant="contained"
                startIcon={<AddBusinessIcon />}
              >
                Add Shop
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <Divider flexItem /> */}
        <Grid
          item
          bgcolor="primary.opaque"
          flexGrow={1}
          padding={{ xs: 2, md: 3 }}
          overflow="scroll"
          height="90%"
        >
          <Grid container justifyContent="space-between" mb={2}>
            <Grid item>
              <Box marginBottom={2}>{localShops.length} Results</Box>
            </Grid>
            <Grid item>
              <Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    dispatch(clearFilter({ type: "Category" }));
                    dispatch(clearFilter({ type: "Area" }));
                    dispatch(setFilter({ type: "Status", value: "all" }));
                  }}
                >
                  {" "}
                  <FilterAltOffIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={7}
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "initial" }}
          >
            {localShops.map((item, index) => {
              return (
                <Grid item key={index}>
                  <ShopCard data={item} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ShopBody;
