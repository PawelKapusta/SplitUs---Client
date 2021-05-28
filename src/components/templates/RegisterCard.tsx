import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from "@material-ui/core/Paper";
import { InputLabel } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { signUp } from "../../store/actions/userActions";
import FormInput from "../atoms/FormInput";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  phone: number;
  avatar?: string;
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
          height: theme.spacing(125),
        },
        [theme.breakpoints.up("md")]: {
          width: theme.spacing(70),
          height: theme.spacing(125),
        },
        [theme.breakpoints.up("lg")]: {
          width: theme.spacing(70),
          height: theme.spacing(125),
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
    register: {
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
    icon: {
      marginBottom: 13,
    },
    input: {
      width: "90%",
      backgroundColor: "#F0FFFF",
    },
    toLogin: {
      marginLeft: "4%",
      fontSize: "1.1em",
      background: "linear-gradient(to right, #b2fefa, #0ed2f7)",
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

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegisterCard: React.FC = () => {
  const [image, setImage] = useState([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is a required field").max(70),
    email: yup.string().required("Email is a required field").max(255),
    password: yup.string().required("Password is a required field").max(255),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is a required field")
      .max(255),
    birthDate: yup.string(),
    phone: yup.number().required("Phone number is a requires field").positive().integer(),
    avatar: yup.string().url(),
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(
      signUp(
        data.fullName,
        data.email,
        data.password,
        data.phone,
        data.birthDate,
        data.avatar,
        false,
        false,
      ),
    );
    reset();
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const handleRedirectClick = () => {
    history.push("/login");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>Register</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            labelTitle="Full Name"
            name="fullName"
            control={control}
            register={register}
            errors={errors?.fullName}
            setValue={setValue}
            numberRows={1}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaceOutlinedIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            type="text"
          />
          <FormInput
            labelTitle="Email"
            name="email"
            control={control}
            register={register}
            errors={errors?.email}
            setValue={setValue}
            numberRows={1}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            type="email"
          />
          <FormInput
            labelTitle="Password"
            name="password"
            control={control}
            register={register}
            errors={errors?.password}
            setValue={setValue}
            numberRows={1}
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
          <FormInput
            labelTitle="Confirm Password"
            name="confirmPassword"
            control={control}
            register={register}
            errors={errors?.confirmPassword}
            setValue={setValue}
            numberRows={1}
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
          <FormInput
            labelTitle="Birth Date"
            name="birthDate"
            control={control}
            register={register}
            errors={errors?.birthDate}
            setValue={setValue}
            required={true}
            numberRows={1}
            InputProps=""
            type="datetime-local"
          />
          <FormInput
            labelTitle="Phone"
            name="phone"
            control={control}
            register={register}
            errors={errors?.phone}
            setValue={setValue}
            numberRows={1}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidOutlinedIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            type="number"
          />
          <InputLabel className={classes.label}>Avatar Image</InputLabel>
          <span className={classes.span}>{errors.avatar?.message}</span>
          <input type="submit" value="Register" className={classes.register} />
          <Button className={classes.toLogin} variant="outlined" onClick={handleRedirectClick}>
            Login
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="success">Thanks for registering. Now please go to LOGIN :)</Alert>
          </Snackbar>
        </form>
      </Paper>
    </div>
  );
};

export default RegisterCard;
