import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import emailjs from "emailjs-com";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { RootStateOrAny, useSelector } from "react-redux";
import QRCode from "react-qr-code";

interface FormValues {
  fullName: string;
  email: string;
  message: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginTop: "7%",
        margin: "auto",
        backgroundColor: "#ffffff",
        [theme.breakpoints.down("sm")]: {
          width: theme.spacing(60),
          height: theme.spacing(95),
        },
        [theme.breakpoints.up("md")]: {
          width: theme.spacing(75),
          height: theme.spacing(98),
        },
        [theme.breakpoints.up("lg")]: {
          width: theme.spacing(90),
          height: theme.spacing(98),
        },
      },
    },
    title: {
      textAlign: "center",
      fontSize: 30,
    },
    form: {
      marginLeft: theme.spacing(5),
    },
    label: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: "1.3em",
    },
    input: {
      width: "90%",
    },
    span: {
      display: "block",
      fontSize: "1em",
      marginTop: 5,
      color: "#FF0000",
    },
    message: {
      width: "90%",
    },
    submitButton: {
      color: "#000000",
      fontSize: "1em",
      width: "25%",
      height: "34px",
      borderRadius: "7%",
      cursor: "pointer",
      border: "1px solid #4169E1",
      marginBottom: 1,
      marginTop: 10,
      padding: 0,
      background: "white",
      "&:hover": {
        background: "#4169E1",
        color: "white",
      },
    },
    codeQrDiv: {
      marginTop: 25,
      fontWeight: "bold",
      fontSize: "1.1em",
      color: "red",
      textAlign: "center",
    },
  }),
);

const ContactCard: React.FC = () => {
  const classes = useStyles();

  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const isAdmin = userInfo?.data?.isAdmin;

  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is a required field"),
    email: yup.string().required("Email is a required field"),
    message: yup.string().required("Message is a required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = (data, event: any) => {
    event.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID as string,
        process.env.REACT_APP_TEMPLATE_ID as string,
        event.target,
        process.env.REACT_APP_USER_ID as string,
      )
      .then(
        result => result,
        error => {
          console.log(error.text);
        },
      );
    reset();
    event.target.reset();
    return data;
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>
          Contact with {isAdmin ? process.env.REACT_APP_MAIN_ADMINISTRATOR : "administrator"}
        </h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <InputLabel className={classes.label}>Full Name</InputLabel>
          <Controller
            name="fullName"
            control={control}
            defaultValue={userInfo?.data.FullName}
            render={({ field: { onChange, value } }) => (
              <TextField
                className={classes.input}
                {...register("fullName", { required: true })}
                id="filled-multiline-flexible"
                name="fullName"
                value={value}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            rules={{ required: "FullName is required" }}
          />
          <span className={classes.span}>{errors.fullName?.message}</span>
          <InputLabel className={classes.label}>Email</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue={userInfo?.data.Email}
            render={({ field: { onChange, value } }) => (
              <TextField
                className={classes.input}
                {...register("email", { required: true })}
                id="filled-multiline-flexible"
                name="email"
                value={value}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  ),
                }}
                type="email"
              />
            )}
            rules={{ required: "Email required" }}
          />

          <span className={classes.span}>{errors.email?.message}</span>
          <InputLabel className={classes.label}>Description</InputLabel>
          <TextField
            {...register("message")}
            className={classes.message}
            id="filled-multiline-flexible"
            name="message"
            label="Multiline"
            multiline
            rows={8}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <span className={classes.span}>{errors.message?.message}</span>
          <input className={classes.submitButton} type="submit" />
        </form>
        <div className={classes.codeQrDiv}>
          <QRCode value="mailto:pawelkapusta70@gmail.com" level="L" size={110} />
          <p>You can also scan this code QR above and write and email from mobile device</p>
        </div>
      </Paper>
    </div>
  );
};

export default ContactCard;
