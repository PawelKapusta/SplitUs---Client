import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import MainNavbar from "../shared/MainNavbar";
import Button from "../components/atoms/Button";

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
  }),
);

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainNavbar />
      <Grid container spacing={6} direction="row" justify="space-evenly" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <div>
              Application used for splitting your expenses with friends. Allows users to create
              groups and bills. You can upload photos and add a comment to each bill. Everything
              looks obvious and easy to use for everybody.
            </div>
          </Paper>
          <NavLink className={classes.button} to="/login">
            <Button type="login_btn" text="Sign In" />
          </NavLink>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia
            className={classes.media}
            image="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            title="Contemplative Reptile"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
