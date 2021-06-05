import React, { forwardRef, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LockIcon from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { TransitionProps } from "@material-ui/core/transitions";
import { InputLabel } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FormInput from "../atoms/FormInput";
import { signOut, updateUserProfile } from "../../store/actions/userActions";
import defaultAvatar from "../../assets/svg/undraw_profile_pic_ic5t.svg";

interface FormValues {
  fullName: string;
  email: string;
  newPassword?: string;
  confirmNewPassword?: string;
  phone: number;
  birthDate: string;
  avatar?: string;
}

/* eslint-disable */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/* eslint-enable */

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
    updateProfile: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #56ab2f, #a8e063)",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 46,
      padding: "0 30px",
      marginTop: "2%",
      cursor: "pointer",
    },
    icon: {
      marginBottom: 13,
    },
    input: {
      width: "90%",
      backgroundColor: "#F0FFFF",
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
    alert: {
      backgroundColor: "transparent",
    },
    uploadingLoading: {
      background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
      marginTop: 5,
    },
    updatingLoading: {
      marginTop: 5,
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfileCard: React.FC = () => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const userUpdateProfile = useSelector((state: RootStateOrAny) => state.userUpdateProfile);
  const { userInfo } = userSignIn;
  const { error, success, loading } = userUpdateProfile;
  const [uploadingLoading, setUploadingLoading] = useState(false);
  const errorMessage =
    error === "Email must be unique"
      ? "User with this email already exist on this platform, please choose another email"
      : "";
  const [image, setImage] = useState(defaultAvatar);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phone, setPhone] = useState(0);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const classes = useStyles();
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  const cutDataToMinutes = userInfo?.data?.BirthDate.match(regex);
  const dispatch = useDispatch();

  useEffect(() => {
    setAlertOpen(true);
  }, [error, success]);

  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is a required field").max(70),
    email: yup.string().required("Email is a required field").max(255),
    newPassword: yup.string().max(255),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .max(255),
    phone: yup.number().required("Phone number is a requires field").positive().integer(),
    birthDate: yup.string(),
    avatar: yup.string().url(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "l0hqmgyr");
    console.log("Form data", formData);
    console.log("image", image);
    try {
      setUploadingLoading(true);
      const resp = await axios.post(
        "https://api.cloudinary.com/v1_1/duk476xud/image/upload",
        formData,
      );
      return resp.data.url;
    } catch (e) {
      console.log(e);
    }
    return defaultAvatar;
  };

  const onSubmit: SubmitHandler<FormValues> = async data => {
    const url = await uploadImage();
    console.log("url", url);
    setAvatar(url);
    setFullName(data.fullName);
    setEmail(data.email);
    setNewPassword(data.newPassword || "");
    setConfirmNewPassword(data.confirmNewPassword || "");
    setBirthDate(data.birthDate);
    setPhone(data.phone);

    handleClickOpen();
    console.log("avatar", avatar);
  };

  const handleAgreeButton = () => {
    if (newPassword !== "") {
      dispatch(updateUserProfile(fullName, email, newPassword, phone, birthDate, avatar));
    } else {
      dispatch(
        updateUserProfile(fullName, email, userInfo.data.Password, phone, birthDate, avatar),
      );
    }
    handleClose();
    setUploadingLoading(false);
    handleAlertClose();
    //dispatch(signOut());
  };

  const handleDisagreeButton = () => {
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>Profile</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            labelTitle="Full Name"
            name="fullName"
            control={control}
            register={register}
            errors={errors?.fullName}
            numberRows={1}
            setValue={setValue}
            setError={setError}
            defaultValue={userInfo?.data?.FullName}
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
            defaultValue={userInfo?.data?.Email}
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
            labelTitle="New password"
            name="newPassword"
            control={control}
            register={register}
            errors={errors?.newPassword}
            setValue={setValue}
            defaultValue=""
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
            labelTitle="Confirm new password"
            name="confirmNewPassword"
            control={control}
            register={register}
            setValue={setValue}
            errors={errors?.confirmNewPassword}
            defaultValue=""
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
            defaultValue={cutDataToMinutes ? cutDataToMinutes[0] : ""}
            setValue={setValue}
            errors={errors?.birthDate}
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
            defaultValue={userInfo?.data?.Phone}
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
          <input
            type="file"
            aria-label="File browser example"
            onChange={event => setImage(event.target.files![0] as any)}
          />
          <span className={classes.span}>{errors.avatar?.message}</span>
          <input type="submit" value="Update Profile" className={classes.updateProfile} />
          {uploadingLoading ? (
            <span>
              {" "}
              <LinearProgress className={classes.uploadingLoading} /> <p>Data analysis ...</p>
            </span>
          ) : (
            ""
          )}
          {loading ? (
            <span>
              <LinearProgress color="secondary" className={classes.updatingLoading} />{" "}
              <p>Updating profile ...</p>
            </span>
          ) : (
            ""
          )}
        </form>
      </Paper>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">
          Are you sure you want to update your profile?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let us update your user details by clicking agree button or disagree to cancel changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagreeButton} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgreeButton} color="secondary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {error ? (
        <Snackbar
          className={classes.alert}
          open={alertOpen}
          autoHideDuration={3000}
          onClose={handleAlertClose}>
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {success ? (
        <Snackbar
          className={classes.alert}
          open={alertOpen}
          autoHideDuration={2000}
          onClose={handleAlertClose}>
          <Alert severity="success">Successfully updated profile, please sign in again</Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileCard;
