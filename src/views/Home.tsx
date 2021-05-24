import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { RootStateOrAny, useSelector } from "react-redux";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Home: React.FC = () => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="info">{`${userInfo.data.message}   ${userInfo.data.FullName}`}</Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
