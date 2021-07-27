import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RootStateOrAny, useSelector } from "react-redux";
import ContactCard from "../components/templates/ContactCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      width: "100%",
      marginTop: theme.spacing(2),
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Contact: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isBlocked = localStorage.getItem("isBlocked");
  const classes = useStyles();

  useEffect(() => {
    if (isBlocked === "true") {
      setOpen(true);
    }
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ContactCard />
      {isBlocked ? (
        <div className={classes.snackbar}>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity="error">
              Your account has been BLOCKED! Please contact with the administrator
            </Alert>
          </Snackbar>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;
