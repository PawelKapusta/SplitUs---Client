import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@material-ui/core/Paper";
import { InputLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { signIn } from "../../store/actions/userActions";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  userInfo: any;
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
          width: theme.spacing(48),
          height: theme.spacing(55),
        },
        [theme.breakpoints.up("md")]: {
          width: theme.spacing(70),
          height: theme.spacing(55),
        },
        [theme.breakpoints.up("lg")]: {
          width: theme.spacing(70),
          height: theme.spacing(55),
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
    login: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #b2fefa, #0ed2f7)",
      marginTop: "1%",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 46,
      padding: "0 30px",
      cursor: "pointer",
    },
    icon: {
      marginBottom: 13,
    },
    input: {
      width: "90%",
      backgroundColor: "#F0FFFF",
    },
    toRegister: {
      marginLeft: "4%",
      fontSize: "1.1em",
      background: "linear-gradient(to right, #f2994a, #f2c94c)",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 46,
      padding: "0 30px",
      cursor: "pointer",
    },
    errors: {
      marginLeft: "2%",
      color: "red",
      fontSize: "1.1em",
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
  }),
);

const LoginCard: React.FC<Props> = ({ userInfo }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required("Email is a required field").max(255),
    password: yup.string().required("Password is a required field").max(255),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(signIn(data.email, data.password));
    reset();
  };

  const handleRedirectClick = () => {
    history.push("/register");
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>Login</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <InputLabel className={classes.label}>Email</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                className={classes.input}
                {...register("email", { required: true })}
                id="filled-multiline-flexible"
                name="email"
                rows={8}
                value={value}
                onChange={onChange}
                variant="filled"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                type="email"
              />
            )}
            rules={{ required: "Email required" }}
          />
          <span className={classes.span}>{errors.email?.message}</span>
          <InputLabel className={classes.label}>Password</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                className={classes.input}
                {...register("password", { required: true })}
                id="filled-multiline-flexible"
                name="password"
                rows={8}
                value={value}
                onChange={onChange}
                variant="filled"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
              />
            )}
            rules={{ required: "Email required" }}
          />

          <span className={classes.span}>{errors.password?.message}</span>
          <input type="submit" value="Login" className={classes.login} />
          <Button className={classes.toRegister} variant="outlined" onClick={handleRedirectClick}>
            New user?
          </Button>
          <span className={classes.errors}>
            {userInfo?.data?.message === "Email or password does not match!"
              ? "Email or password does not match!"
              : ""}
          </span>
          <span className={classes.errors}>
            {userInfo?.data?.message === "Password does not match!"
              ? "Password does not match!"
              : ""}
          </span>
        </form>
      </Paper>
    </div>
  );
};

export default LoginCard;
