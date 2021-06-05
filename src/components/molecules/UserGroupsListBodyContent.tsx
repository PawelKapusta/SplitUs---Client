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
import Button from "../atoms/Button";
import GroupEdit from "../templates/GroupEdit";
import { getDetailsGroup, getListUsersOfGroup } from "../../store/actions/groupsActions";

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
});

/* eslint-disable */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/* eslint-enable */

const UserGroupsListBodyContent: React.FC<Props> = ({ page, rowsPerPage, columns }) => {
  const userGroupsList = useSelector((state: RootStateOrAny) => state.userGroupsList);
  const { groups } = userGroupsList;
  const [open, setOpen] = useState<boolean>(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenClick = async (id: string) => {
    history.push(`/groups/${id}`);
  };

  console.log(groups);

  const handleEditClick = (id: string, index: number) => {
    setIndexToEdit(index);
    handleClickOpen();
    console.log(id);
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
                    {value}
                  </TableCell>
                );
              })}
              <span className={classes.buttons}>
                <Button
                  onClick={() => handleOpenClick(groups[index].ID)}
                  type="open_btn"
                  text="Open"
                />
                <Button
                  onClick={() => handleEditClick(groups[index].ID, index)}
                  type="edit_btn"
                  text="Edit"
                />
                <Button type="delete_btn" text="Delete" />
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
            {console.log("index", indexToEdit)}
            <GroupEdit
              group={groups[indexToEdit]}
              handleClose={handleClose}
              handleEditClick={handleEditClick}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserGroupsListBodyContent;
