import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { useHistory } from "react-router";
import LinesEllipsis from "react-lines-ellipsis";
import Button from "../atoms/Button";
import { deleteBill } from "../../store/actions/billsActions";

interface Props {
  page: number;
  rowsPerPage: number;
  columns: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  buttons: {
    paddingLeft: "8%",
    marginTop: 15,
    marginRight: 15,
    [theme.breakpoints.down("sm")]: {
      marginTop: 30,
    },
    [theme.breakpoints.down("md")]: {
      marginTop: 20,
    },
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
}));

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const AdminBillsListBodyContent: React.FC<Props> = ({ page, rowsPerPage, columns }) => {
  const deletedBill = useSelector((state: RootStateOrAny) => state.deletedBill);
  const { loading: deletedBillLoading } = deletedBill;
  const billsList = useSelector((state: RootStateOrAny) => state.billsList);
  const { bills } = billsList;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [billId, setBillId] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleConfirmDeleteDialogClickOpen = () => {
    setOpenDeleteDialog(true);
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

  const handleOpenClick = async (id: string) => {
    history.push(`/bill/${id}`);
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
                    onClick={() => handleDeleteClick(bills[index].ID)}
                    type="delete_btn"
                    text="Delete"
                  />
                </Box>
              </div>
            </TableRow>
          );
        })}
      {deletedBillLoading ? (
        <span>
          <LinearProgress color="secondary" className={classes.loadingDelete} />{" "}
          <p>Deleting bill ...</p>
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
            Are you sure you want to delete this bill? It will also delete all comments and debt
            that are in this bill!
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

export default AdminBillsListBodyContent;
