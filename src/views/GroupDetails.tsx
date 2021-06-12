import React, { forwardRef, Ref, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Dialog from "@material-ui/core/Dialog";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import OwnerBillEdit from "../components/templates/OwnerBillEdit";
import GroupBillsList from "../components/organisms/GroupBillsList";
import { getAllBillsInGroup } from "../store/actions/billsActions";
import { UPDATE_BILL_RESET } from "../constants/billsConstants";
import IconButton from "../components/atoms/Button";
import { getDetailsGroup, getListUsersOfGroup } from "../store/actions/groupsActions";
import BillCreator from "../components/organisms/BillCreator";

interface Props {
  match: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 40,
      [theme.breakpoints.up("xs")]: {
        width: 350,
      },
      [theme.breakpoints.up("sm")]: {
        width: 580,
      },
      [theme.breakpoints.up("md")]: {
        width: 900,
      },
      [theme.breakpoints.up("lg")]: {
        width: 1200,
      },
    },
    list: {
      width: "100%",
      position: "relative",
      overflow: "auto",
      maxHeight: 360,
      marginTop: 5,
      marginLeft: 35,
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.up("xs")]: {
        maxWidth: 350,
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: 450,
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: 550,
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: 600,
      },
    },
    listElementsTitles: {
      fontWeight: "bold",
    },
    isAdmin: {
      fontWeight: "bold",
      color: "#e84118",
    },
    isNormalUser: {
      fontWeight: "bold",
      color: "#00a8ff",
    },
    membersTitle: {
      marginLeft: 45,
      color: "#ffffff",
    },
    inline: {
      display: "inline",
    },
    title: {
      marginLeft: 14,
      fontSize: 35,
      color: "#e84118",
      fontWeight: "bold",
    },
    description: {
      padding: 15,
      marginBottom: 12,
      fontSize: 20,
    },
    date: {
      fontWeight: "bold",
      color: "#192a56",
      marginLeft: 10,
    },
  }),
);

/* eslint-disable */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/* eslint-enable */

const GroupDetails: React.FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const groupDetails = useSelector((state: RootStateOrAny) => state.groupDetails);
  const { group, loading: loadingGroup } = groupDetails;
  const usersOfGroup = useSelector((state: RootStateOrAny) => state.usersOfGroup);
  const { users, loading: usersOfGroupLoading } = usersOfGroup;
  const allBillsInGroup = useSelector((state: RootStateOrAny) => state.allBillsInGroup);
  const { loading: allBillsInGroupLoading } = allBillsInGroup;
  const updatedBill = useSelector((state: RootStateOrAny) => state.updatedBill);
  const { success: updateOwnerBillsSuccess } = updatedBill;
  const deletedBill = useSelector((state: RootStateOrAny) => state.deletedBill);
  const { success: deleteBillSuccess } = deletedBill;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  const cutDataToMinutes = String(group?.DataCreated?.match(regex)).replace("T", " ");

  useEffect(() => {
    dispatch(getDetailsGroup(match?.params?.id));
    dispatch(getListUsersOfGroup(match?.params?.id));
    dispatch(getAllBillsInGroup(match?.params?.id));
    dispatch({ type: UPDATE_BILL_RESET });
  }, [updateOwnerBillsSuccess, deleteBillSuccess]);

  console.log("users", users);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateBillButtonClick = () => {};

  /* eslint-disable */
  return (
    <>
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        alignContent="stretch">
        <Grid container item xs={12} md={12} lg={12} justify="center">
          {loadingGroup ? (
            <LinearProgress />
          ) : (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {group?.Name}
                </Typography>
                <Typography className={classes.description} color="textSecondary">
                  {group?.Description}
                </Typography>
                <Typography className={classes.date}>
                  Data created:
                  <br />
                  {cutDataToMinutes}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        <Grid container item xs={12} md={12} lg={12} justify="flex-start">
          <h1 className={classes.membersTitle}>Members in group:</h1>
        </Grid>
        {usersOfGroupLoading ? (
          <LinearProgress />
        ) : (
          <Grid container item xs={12} md={12} lg={12} justify="flex-start">
            <List className={classes.list}>
              {users?.map((user: any) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={user?.AvatarImage} />
                    </ListItemAvatar>
                    <ListItemText
                      className={user?.isAdmin ? classes.isAdmin : classes.isNormalUser}
                      primary={user?.FullName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          />
                          <span className={classes.listElementsTitles}>Email: </span>
                          {user?.Email} <span className={classes.listElementsTitles}>Phone:</span>{" "}
                          {user?.Phone}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
      {allBillsInGroupLoading ? <LinearProgress /> : <GroupBillsList />}
      <IconButton
        onClick={handleCreateBillButtonClick}
        type="create_bill_btn"
        text="Create new bill"
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <BillCreator groupId={match?.params?.id} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GroupDetails;
