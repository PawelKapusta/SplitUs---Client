import React, { forwardRef, Ref, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import TableRow from "@material-ui/core/TableRow";
import { v4 as uuidv4 } from "uuid";
import TableCell from "@material-ui/core/TableCell";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import LinesEllipsis from "react-lines-ellipsis";
import Button from "../atoms/Button";
import OwnerBillEdit from "../templates/OwnerBillEdit";
import { getDetailsGroup } from "../../store/actions/groupsActions";
import { deleteBill } from "../../store/actions/billsActions";
import { UPDATE_BILL_RESET } from "../../constants/billsConstants";

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

const GroupBillsListBodyContent: React.FC<Props> = ({ page, rowsPerPage, columns }) => {
  const allBillsInGroup = useSelector((state: RootStateOrAny) => state.allBillsInGroup);
  const { bills } = allBillsInGroup;
  const updatedBill = useSelector((state: RootStateOrAny) => state.updatedBill);
  const { success: updateOwnerBillsSuccess } = updatedBill;
  const deletedBill = useSelector((state: RootStateOrAny) => state.deletedBill);
  const { loading: deleteBillLoading, success: deleteBillSuccess } = deletedBill;
  const createdBill = useSelector((state: RootStateOrAny) => state.createdBill);
  const { loading: createBillLoading } = createdBill;
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
                    onClick={() => handleOpenClick(bills[index].ID)}
                    type="open_btn"
                    text="Open"
                  />
                </Box>
                <Box alignSelf="center" style={{ marginBottom: 15 }}>
                  <Button
                    onClick={() => handleEditClick(bills[index].ID, index)}
                    type="edit_btn"
                    text="Edit"
                  />
                </Box>
                <Box alignSelf="flex-end" style={{ marginBottom: 15 }}>
                  <Button
                    onClick={() => handleDeleteClick(bills[index].ID)}
                    type="delete_btn"
                    text="Delete"
                  />
                </Box>
              </div>
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
        <h2 className={classes.billsLengthWarning}>This group does not have any active bills</h2>
      ) : (
        ""
      )}
      {createBillLoading ? (
        <span>
          {" "}
          <LinearProgress className={classes.loadingDelete} /> <p>Creating bill ...</p>
        </span>
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

export default GroupBillsListBodyContent;
