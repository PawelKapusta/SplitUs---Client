import React, { useState, forwardRef, Ref, useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Button from "../atoms/Button";
import { deleteUser } from "../../store/actions/userActions";
import AdminUserEdit from "../templates/AdminUserEdit";

interface Props {
  page: number;
  rowsPerPage: number;
  columns: any;
}

const useStyles = makeStyles({
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  row: {
    fontSize: ".9rem",
  },
  loadingDelete: {
    background: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
    marginTop: 5,
  },
  alert: {
    backgroundColor: "transparent",
  },
  billsLengthWarning: {
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

/* eslint-disable */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/* eslint-enable */

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const AdminUsersListBodyContent: React.FC<Props> = ({ page, rowsPerPage, columns }) => {
  const userDelete = useSelector((state: RootStateOrAny) => state.userDelete);
  const { loading: userDeleteLoading, success: userDeleteSuccess } = userDelete;
  const userList = useSelector((state: RootStateOrAny) => state.userList);
  const { users } = userList;
  const userAdminUpdate = useSelector((state: RootStateOrAny) => state.userAdminUpdate);
  const { loading: userAdminUpdateLoading, success: userAdminUpdateSuccess } = userAdminUpdate;
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openEditAlert, setOpenEditAlert] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleConfirmDeleteDialogClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    setOpenAlert(true);
  }, [userDeleteSuccess]);

  useEffect(() => {
    setOpenEditAlert(true);
  }, [userAdminUpdateSuccess]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (index: number) => {
    setIndexToEdit(index);
    handleClickOpen();
  };

  const handleDeleteClick = (id: string) => {
    setUserId(id);
    handleConfirmDeleteDialogClickOpen();
  };

  const handleConfirmDialogDeleteClose = async () => {
    await dispatch(deleteUser(userId));
    setOpenDeleteDialog(false);
  };

  const handleDialogDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleEditAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    const temporary = event;
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenEditAlert(false);
  };

  return (
    <>
      {users
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row: any, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
              {columns.map((column: any) => {
                const value = row[column.id];

                return (
                  <TableCell className={classes.row} key={uuidv4()} align={column.align}>
                    {column.format && typeof value === "boolean" ? column.format(value) : value}
                  </TableCell>
                );
              })}
              <span className={classes.buttons}>
                <Button onClick={() => handleEditClick(index)} type="edit_btn" text="Edit" />
                <Button
                  onClick={() => handleDeleteClick(users[index].ID)}
                  type="delete_btn"
                  text="Delete"
                />
              </span>
            </TableRow>
          );
        })}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <AdminUserEdit user={users[indexToEdit]} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {userDeleteLoading ? (
        <span>
          <LinearProgress color="secondary" className={classes.loadingDelete} />{" "}
          <p>Deleting user ...</p>
        </span>
      ) : (
        ""
      )}
      {userDeleteSuccess ? (
        <Snackbar
          className={classes.alert}
          open={openAlert}
          autoHideDuration={2500}
          onClose={handleAlertClose}>
          <Alert severity="success">Successfully deleted user</Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {userAdminUpdateSuccess ? (
        <Snackbar
          className={classes.alert}
          open={openEditAlert}
          autoHideDuration={2400}
          onClose={handleEditAlertClose}>
          <Alert severity="success">Successfully updated user</Alert>
        </Snackbar>
      ) : (
        ""
      )}
      <Dialog
        open={openDeleteDialog}
        onClose={handleConfirmDialogDeleteClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: "move", color: "red" }} id="draggable-dialog-title">
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? It will also delete all his bills and
            comments that he already have made
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDeleteClose} type="cancel_btn" text="Cancel">
            Cancel
          </Button>
          <Button onClick={handleConfirmDialogDeleteClose} type="save_btn" text="Confirm">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminUsersListBodyContent;
