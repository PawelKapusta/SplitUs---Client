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
import { useHistory, Redirect } from "react-router";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import LinesEllipsis from "react-lines-ellipsis";
import Button from "../atoms/Button";
import GroupEdit from "../templates/GroupEdit";
import { deleteGroup } from "../../store/actions/groupsActions";
import { DELETE_GROUP_RESET } from "../../constants/groupsConstants";

interface Props {
  page: number;
  rowsPerPage: number;
  columns: any;
}

const useStyles = makeStyles({
  buttons: {
    marginTop: 15,
    marginRight: 10,
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
  groupsLengthWarning: {
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

const UserGroupsListBodyContent: React.FC<Props> = ({ page, rowsPerPage, columns }) => {
  const userGroupsList = useSelector((state: RootStateOrAny) => state.userGroupsList);
  const { groups } = userGroupsList;
  const deletedGroup = useSelector((state: RootStateOrAny) => state.deletedGroup);
  const { loading, success } = deletedGroup;
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [groupId, setGroupId] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleConfirmDeleteDialogClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    setOpenAlert(true);
  }, [success]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenClick = async (id: string) => {
    history.push(`/group/${id}`);
  };

  const handleEditClick = (index: number) => {
    setIndexToEdit(index);
    handleClickOpen();
  };

  const handleDeleteClick = (id: string) => {
    setGroupId(id);
    handleConfirmDeleteDialogClickOpen();
  };

  const handleConfirmDialogDeleteClose = async () => {
    await dispatch(deleteGroup(groupId));
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
    setOpenAlert(false);
    dispatch({ type: DELETE_GROUP_RESET });
  };

  return (
    <>
      {groups
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row: any, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
              {columns.map((column: any) => {
                const value = row[column.id];
                console.log("column", index);
                return (
                  <TableCell className={classes.row} key={uuidv4()} align={column.align}>
                    {value.length > 255 ? (
                      <LinesEllipsis
                        text={value}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}
              <div className={classes.buttons}>
                <Box alignSelf="flex-start" style={{ marginBottom: 15 }}>
                  <Button
                    onClick={() => handleOpenClick(groups[index].ID)}
                    type="open_btn"
                    text="Open"
                  />
                </Box>
                <Box alignSelf="center" style={{ marginBottom: 15 }}>
                  <Button onClick={() => handleEditClick(index)} type="edit_btn" text="Edit" />
                </Box>
                <Box alignSelf="flex-end" style={{ marginBottom: 15 }}>
                  <Button
                    onClick={() => handleDeleteClick(groups[index].ID)}
                    type="delete_btn"
                    text="Delete"
                  />
                </Box>
              </div>
            </TableRow>
          );
        })}
      {groups?.length === 0 ? (
        <h2 className={classes.groupsLengthWarning}>You do not belong to any group</h2>
      ) : (
        ""
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {console.log("index", indexToEdit)}
            <GroupEdit group={groups[indexToEdit]} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {loading ? (
        <span>
          <LinearProgress color="secondary" className={classes.loadingDelete} />{" "}
          <p>Deleting group ...</p>
        </span>
      ) : (
        ""
      )}
      {success ? (
        <Snackbar
          className={classes.alert}
          open={openAlert}
          autoHideDuration={2500}
          onClose={handleAlertClose}>
          <Alert severity="success">Successfully deleted group</Alert>
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
            Are you sure you want to delete this group? It will also delete all bills and comments
            in this group!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogDeleteClose} type="cancel_btn" text="Cancel">
            Cancel
          </Button>
          <Button onClick={handleConfirmDialogDeleteClose} type="save_btn" text="Confirm">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserGroupsListBodyContent;
