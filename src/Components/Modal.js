import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useSelector, useDispatch } from "react-redux";
import { setModalData, toggleModal } from "../features/util/utilSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  maxHeight: "70vh",
  height: "fit-content",
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: "white 0 0 5px 0.5px",
  p: 4,
  minWidth: "min(70vw,500px)",
  borderRadius: "5px",
  overflow: "scroll",
};

export default function TransitionsModal() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleModal());
    dispatch(setModalData(undefined));
  };
  const { ModalContent, isModal, ModalData } = useSelector((state) => {
    return state.util;
  });
  return (
    <>
      {ModalContent && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModal}>
            <Box sx={style}>
              <ModalContent setIsModal={handleClose} data={ModalData} />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}
