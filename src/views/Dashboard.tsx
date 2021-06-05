import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "../components/atoms/Button";
import auth from "../auth";
import { listUsers } from "../store/actions/userActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "5%",
      marginRight: "5%",
      marginLeft: "10%",
      width: "80%",
      position: "relative",
    },
    paper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: theme.spacing(4),
      color: theme.palette.text.secondary,
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 30,
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 37,
      },
      height: "50vh",
    },
    button: {
      position: "relative",
      left: 10,
      bottom: 60,
      textDecoration: "none",
    },
    media: {
      objectFit: "contain",
      height: 670,
    },
    snackbar: {
      width: "100%",
      marginTop: theme.spacing(2),
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard: React.FC = () => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const firstLogin = sessionStorage.getItem("firstSignIn");
  const firstRender = localStorage.getItem("firstRender");

  useEffect(() => {
    setOpen(true);
    dispatch(listUsers());
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);

    if (firstLogin) {
      sessionStorage.removeItem("firstSignIn");
      localStorage.removeItem("firstRender");
    } else {
      localStorage.removeItem("firstRender");
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={6} direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div>
              Application used for splitting your expenses with friends. Allows users to create
              groups and bills. You can upload photos and add a comment to each bill. Everything
              looks obvious and easy to use for everybody.
            </div>
          </Paper>
          {auth.isAuthenticated() ? (
            ""
          ) : (
            <NavLink className={classes.button} to="/login">
              <Button type="signIn_btn" text="Sign In" />
            </NavLink>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia
            className={classes.media}
            image="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            title="Contemplative Reptile"
          />
        </Grid>
      </Grid>
      {userInfo && firstLogin && firstRender ? (
        <div className={classes.snackbar}>
          <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
            <Alert severity="info">{`Welcome ${userInfo?.data?.FullName} our new user. We hope you will enjoyed well :)`}</Alert>
          </Snackbar>
        </div>
      ) : (
        ""
      )}
      {userInfo && !firstLogin && firstRender ? (
        <div className={classes.snackbar}>
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert severity="info">{`${userInfo?.data?.message}  ${userInfo?.data?.FullName}`}</Alert>
          </Snackbar>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
