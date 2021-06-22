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
import DialogActions from "@material-ui/core/DialogActions";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import Button from "../atoms/Button";
import GroupEdit from "../templates/GroupEdit";
import { getDetailsGroup } from "../../store/actions/groupsActions";
import OwnerBillEdit from "../templates/OwnerBillEdit";
import { deleteBill } from "../../store/actions/billsActions";
import { DELETE_GROUP_RESET } from "../../constants/groupsConstants";
import { UPDATE_BILL_RESET } from "../../constants/billsConstants";

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

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const OwnerBillsListBodyContent: React.FC<Props> = ({ page, rowsPerPage, columns }) => {
  const ownerBills = useSelector((state: RootStateOrAny) => state.ownerBills);
  const { bills, success: ownerBillsSuccess } = ownerBills;
  const deletedBill = useSelector((state: RootStateOrAny) => state.deletedBill);
  const { loading: deleteBillLoading, success: deleteBillSuccess } = deletedBill;
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [billId, setBillId] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleConfirmDeleteDialogClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenClick = async (id: string) => {
    await dispatch(getDetailsGroup(id));
    history.push(`/bill/${id}`);
  };

  const handleEditClick = (id: string, index: number) => {
    setIndexToEdit(index);
    handleClickOpen();
    console.log(id);
  };

  const handleDeleteClick = (id: string) => {
    setBillId(id);
    handleConfirmDeleteDialogClickOpen();
  };

  const handleConfirmDialogDeleteClose = async () => {
    await dispatch(deleteBill(billId));
    setOpenDeleteDialog(false);
  };

  const handleDialogDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      {bills
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row: any, index: number) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
              {columns.map((column: any) => {
                const value = row[column.id];
                return (
                  <TableCell className={classes.row} key={uuidv4()} align={column.align}>
                    {value}
                  </TableCell>
                );
              })}
              <span className={classes.buttons}>
                <Button
                  onClick={() => handleOpenClick(bills[index].ID)}
                  type="open_btn"
                  text="Open"
                />
                <Button
                  onClick={() => handleEditClick(bills[index].ID, index)}
                  type="edit_btn"
                  text="Edit"
                />
                <Button
                  onClick={() => handleDeleteClick(bills[index].ID)}
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
            <OwnerBillEdit bill={bills[indexToEdit]} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {deleteBillLoading ? (
        <span>
          <LinearProgress color="secondary" className={classes.loadingDelete} />{" "}
          <p>Deleting bill ...</p>
        </span>
      ) : (
        ""
      )}
      {bills?.length === 0 ? (
        <h2 className={classes.billsLengthWarning}>You haven't created any active bills yet</h2>
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
            Are you sure you want to delete this bill? It will also delete all comments and debts in
            this bill!
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

export default OwnerBillsListBodyContent;
