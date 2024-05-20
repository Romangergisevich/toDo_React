import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Alert from "@mui/material/Alert";

// import { RootState } from "../redux/store";
// import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";
// import { increase, decrease } from "../redux/features/counter";

function SlideTransition(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="up"
    />
  );
}

const Tests: React.FC = (props) => {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  // const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });

  const snackbarClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      setSnackbar({
        open: true,
        Transition,
      });
    };

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <>
      Ready for new tests
      <div>
        <Button onClick={snackbarClick(SlideTransition)}>Slide Transition</Button>
        <Snackbar
          open={snackbar.open}
          onClose={handleClose}
          TransitionComponent={snackbar.Transition}
          message="I love snacks"
          key={snackbar.Transition.name}
          autoHideDuration={1200}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}>qwe</Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Tests;
