import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { deleteShop } from "../../../features/shop/shopSlice";
import {
  setModalContent,
  setModalData,
  toggleModal,
} from "../../../features/util/utilSlice";
import AddShop from "../Forms/AddUpdateShop";

export default function ShopCard({ data }) {
  const dispatch = useDispatch();
  return (
    <Card sx={{ shadow: 2, cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="194"
        sx={{ width: "300px", objectFit: "cover" }}
        image={`https://source.unsplash.com/random/?${data.category}`}
        alt={data.category}
      />
      <CardHeader
        sx={{ padding: "10px" }}
        title={
          <Grid container justifyContent="space-between">
            <Grid item>
              <Box fontSize={20}>{data.store_name}</Box>
            </Grid>
            <Grid item fontSize="1rem" color="gray">
              {data.area}
            </Grid>
          </Grid>
        }
        subheader={
          <Box>
            {dayjs() > data.opening_date && dayjs() < data.closing_date ? (
              <Box color="green">Open</Box>
            ) : (
              <Box color="red">Close</Box>
            )}
          </Box>
        }
      />
      <CardContent>
        <Box fontWeight="bold" color="darkgray">
          {data.category}
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: "0 7px" }}>
        <IconButton
          aria-label="Update Shop"
          onClick={() => {
            dispatch(setModalData(data));
            dispatch(setModalContent(AddShop));
            dispatch(toggleModal());
          }}
        >
          <UpdateIcon />
        </IconButton>
        <IconButton
          aria-label="Delete Shop"
          onClick={() => {
            dispatch(deleteShop(data.id));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
