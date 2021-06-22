import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import StarsIcon from "@material-ui/icons/Stars";
import PhoneIcon from "@material-ui/icons/Phone";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";
import LinearProgress from "@material-ui/core/LinearProgress";
import QRCode from "react-qr-code";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { InputLabel } from "@material-ui/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getAllUsersInBill,
  getDetailsBill,
  updateCodeQrValueInBill,
  settleUpBillUser,
} from "../store/actions/billsActions";
import Flag from "../components/atoms/Flag";
import defaultBillImage from "../assets/images/defaultImage.jpg";

interface Props {
  match: any;
}

interface FormValues {
  content: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    marginTop: 20,
  },
  mainCard: {
    position: "relative",
    maxWidth: "80%",
    margin: "auto",
    background: "linear-gradient(to right, #aaffa9, #11ffbd)",
    borderRadius: "25px",
    marginBottom: 35,
    color: "#000000",
    [theme.breakpoints.up("sm")]: {
      paddingBottom: "2em",
    },
  },
  debtDiv: {
    position: "relative",

    [theme.breakpoints.up("sm")]: {
      fontSize: "1.3em",
      left: 10,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.4em",
      left: 20,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.8em",
      left: 20,
    },
  },
  debtNumber: {
    color: "red",
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3em",
    },

    color: "#000000",
  },
  dates: {
    fontWeight: "bold",
    float: "right",
    [theme.breakpoints.up("sm")]: {
      fontSize: ".95em",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.1em",
    },
  },
  codeQRDiv: {
    marginTop: 15,
    [theme.breakpoints.down("sm")]: {
      marginTop: 65,
    },
    marginLeft: 15,
  },
  flag: {
    width: "2.5em",
    height: "2.5em",
  },
  description: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    marginBottom: 12,
    color: "#000000",
    fontStyle: "italic",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.1em",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3em",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5em",
    },
  },
  generateButton: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 15,
      marginTop: 25,
      height: "40px",
      minWidth: "150px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 25,
      marginBottom: 15,
      height: "40px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: 25,
      marginBottom: 15,
      height: "40px",
    },
  },
  usersLoader: {
    marginTop: 15,
  },
  usersDebt: {
    color: "red",
    fontSize: "1.2em",
    fontWeight: "bold",
    marginTop: 10,
  },
  usersDoneIcon: {
    color: "green",
  },
  usersPhone: {
    fontWeight: "bold",
    fontSize: "1.2em",
    marginTop: 15,
  },
  usersRegulated: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  usersXIcon: {
    marginBottom: -6,
  },
  usersOwnerIcon: {
    marginBottom: -6,
    marginRight: 5,
    color: "#FFD700",
  },
  usersListLabel: {
    fontWeight: "bold",
    fontSize: "1.2em",
  },
  usersListLabelAdmin: {
    fontWeight: "bold",
    fontSize: "1.2em",
    color: "red",
  },
  tooltip: {
    fontSize: "1.5em",
  },
  list: {
    position: "relative",
    borderRadius: "15px",
    width: "60%",
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
  },
  inline: {
    display: "inline",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "5%",
    marginTop: "5%",
    height: 240,
    width: 400,
  },
  usersSettleButton: {
    margin: "auto",
    color: "white",
  },
  showImage: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4%",
  },
  showImageButton: {
    background: "linear-gradient(to right, #f12711, #f5af19)",
  },
  billImage: {
    [theme.breakpoints.up("xs")]: {
      maxWidth: 300,
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 580,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 900,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 1200,
    },
  },
  commentsTitle: {
    textAlign: "center",
    color: "#ffffff",
    marginTop: "3%",
    fontSize: "2.5em",
  },
  formDiv: {
    marginLeft: "15%",
  },
  form: {
    textAlign: "center",
    background: "#ffffff",
    padding: "1.5%",
    width: "80%",
    borderRadius: "50px",
  },
  input: {
    width: "95%",
  },
  span: {
    display: "block",
    fontSize: "1.1em",
    marginTop: 5,
    color: "#FF0000",
    fontWeight: "bold",
  },
  message: {
    width: "90%",
  },
  submitButton: {
    color: "#ffffff",
    fontSize: "1.1em",
    width: "15%",
    height: "34px",
    borderRadius: "15px",
    cursor: "pointer",
    border: "1px solid #b33939",
    marginBottom: 1,
    marginTop: 10,
    padding: 0,
    background: "#ff5252",
    "&:hover": {
      background: "#b33939",
      color: "white",
    },
  },
}));

const BillDetails: React.FC<Props> = ({ match }) => {
  const billDetails = useSelector((state: RootStateOrAny) => state.billDetails);
  const { bill, loading: billDetailsLoading } = billDetails;
  const usersInBill = useSelector((state: RootStateOrAny) => state.usersInBill);
  const { users, loading: usersInBillLoading } = usersInBill;
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const settleUpUpdateBill = useSelector((state: RootStateOrAny) => state.settleUpUpdateBill);
  const { success: settleUpUpdateBillSuccess } = settleUpUpdateBill;

  const allUsersInBill = users?.usersBills;
  const allUsersInBillData = users?.usersData;
  const [isCodeQRCreated, setIsCodeQRCreated] = useState(false);
  const [codeQRUrl, setCodeQRUrl] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(match?.params?.id);
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  const cutDataCreatedToMinutes = String(bill?.DataCreated?.match(regex)).replace("T", " ");
  const cutDataEndToMinutes = String(bill?.DataEnd?.match(regex)).replace("T", " ");

  useEffect(() => {
    dispatch(getDetailsBill(match?.params?.id));
    dispatch(getAllUsersInBill(match?.params?.id));
  }, [settleUpUpdateBillSuccess]);

  console.log("1", users?.usersBills);
  console.log("2", users?.usersData);

  const handleGenerateCodeQRClick = () => {
    setCodeQRUrl(window.location.href);
    setIsCodeQRCreated(true);
    dispatch(updateCodeQrValueInBill(match?.params?.id, window.location.href));
  };

  const handleCloseGenerateCodeQRClick = () => {
    setIsCodeQRCreated(false);
  };

  const findImage = (user: any) => {
    const searchedUser = allUsersInBillData?.find((finder: any) => finder.ID === user.UserId);
    return searchedUser?.AvatarImage;
  };

  const findUser = (user: any) => {
    return allUsersInBillData?.find((finder: any) => finder.ID === user.UserId);
  };

  const checkIfCanSettleUp = (user: any) => {
    return userInfo?.data?.ID === user?.UserId && user?.isRegulated === false;
  };

  const isAdminUser = (user: any) => {
    const searchedUser = allUsersInBillData?.find((finder: any) => finder.ID === user.UserId);
    return searchedUser?.isAdmin;
  };

  const isBillOwner = (user: any) => {
    return bill?.OwnerId === user?.UserId;
  };

  const schema = yup.object().shape({
    content: yup.string().required("Content is a required field"),
  });

  const handleSettleUpUser = (usersBills: any) => {
    dispatch(settleUpBillUser(usersBills.ID));
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log("data", data);
    reset();
  };

  return (
    <>
      {billDetailsLoading ? (
        <LinearProgress />
      ) : (
        <div>
          <div className={classes.mainContent}>
            <Card className={classes.mainCard} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {bill?.Name}
                </Typography>
                <Typography className={classes.debtDiv} variant="h5" component="h2">
                  Debt: <span className={classes.debtNumber}>{bill?.Debt} </span>
                  {bill?.CurrencyCode}{" "}
                  <span className={classes.flag}>
                    <Flag code={String(bill?.CurrencyCode)?.substring(0, 2)} />
                  </span>
                </Typography>
                <Typography className={classes.description} color="textSecondary">
                  {bill?.Description}
                </Typography>
                <Typography className={classes.dates} variant="body2" component="p">
                  Data created: {cutDataCreatedToMinutes}
                  <br />
                  Data end: {cutDataEndToMinutes}
                </Typography>
                {isCodeQRCreated ? (
                  <div className={classes.codeQRDiv}>
                    <QRCode value={codeQRUrl} level="L" size={180} />
                  </div>
                ) : (
                  ""
                )}
              </CardContent>
              <CardActions>
                {isCodeQRCreated ? (
                  <Button
                    className={classes.generateButton}
                    onClick={handleCloseGenerateCodeQRClick}
                    color="primary"
                    variant="contained">
                    Hide code QR
                  </Button>
                ) : (
                  <Button
                    className={classes.generateButton}
                    onClick={handleGenerateCodeQRClick}
                    size="small"
                    color="secondary"
                    variant="contained">
                    Generate code QR to this bill
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
          {usersInBillLoading ? (
            <LinearProgress className={classes.usersLoader} color="secondary" />
          ) : (
            <List className={classes.list}>
              {allUsersInBill?.map((user: any) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={findImage(user)} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          {isBillOwner(user) ? (
                            <Tooltip title={<h2>Bill owner</h2>} placement="top">
                              <StarsIcon className={classes.usersOwnerIcon} />
                            </Tooltip>
                          ) : (
                            ""
                          )}

                          <span
                            className={
                              isAdminUser(user)
                                ? classes.usersListLabelAdmin
                                : classes.usersListLabel
                            }>
                            {findUser(user)?.FullName}
                          </span>

                          <span className={classes.usersPhone}>
                            {" "}
                            <PhoneIcon color="primary" fontSize="inherit" /> {findUser(user)?.Phone}
                          </span>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            <span className={classes.usersDebt}>Debt: {user?.Debt}</span>
                            <br />
                            <span className={classes.usersRegulated}>
                              {" "}
                              Regulated:{" "}
                              {user?.isRegulated ? (
                                <DoneIcon className={classes.usersDoneIcon} />
                              ) : (
                                <CloseIcon className={classes.usersXIcon} color="secondary" />
                              )}
                            </span>
                          </Typography>
                        </>
                      }
                    />
                    <span className={classes.usersSettleButton}>
                      {checkIfCanSettleUp(user) && !isBillOwner(user) ? (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => handleSettleUpUser(user)}>
                          Settle up
                        </Button>
                      ) : (
                        ""
                      )}
                    </span>
                    <span className={classes.usersSettleButton}>
                      {checkIfCanSettleUp(user) && isBillOwner(user) ? (
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => handleSettleUpUser(user)}>
                          Settle up as owner
                        </Button>
                      ) : (
                        ""
                      )}
                    </span>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          )}
          <span className={classes.showImage}>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState: any) => (
                <div>
                  <span className={classes.showImageButton}>
                    <Button
                      startIcon={<ImageIcon />}
                      style={{ background: "#EA2027", color: "#ffffff", height: "45px" }}
                      variant="contained"
                      {...bindTrigger(popupState)}>
                      Show bill image
                    </Button>
                  </span>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}>
                    <Box p={2}>
                      <img
                        className={classes.billImage}
                        src={bill?.BillImage ? bill?.BillImage : defaultBillImage}
                        alt="BillImage"
                      />
                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
          </span>
          <h1 className={classes.commentsTitle}>Comments</h1>
          <div className={classes.formDiv}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="content"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className={classes.input}
                    {...register("content", { required: true })}
                    id="filled-multiline-flexible"
                    name="content"
                    value={value}
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    rows={8}
                    multiline={true}
                  />
                )}
                rules={{ required: "FullName is required" }}
              />
              <span className={classes.span}>{errors.content?.message}</span>
              <input className={classes.submitButton} type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BillDetails;
