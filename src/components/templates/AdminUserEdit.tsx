import React, { ChangeEvent, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/userActions";
import Button from "../atoms/Button";

interface Props {
  user: any;
  handleClose: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    height: 500,
  },
  title: {
    color: "red",
  },
  button: {
    width: 600,
    border: "1px solid green",
    marginLeft: 7,
    "&:hover": {
      background: "linear-gradient(to right, #a1ffce, #faffd1)",
    },
  },
  label: {
    fontSize: "1.2em",
  },
  redColorWord: {
    color: "red",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: 5,
  },
  confirmButtons: {
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      top: 10,
      left: 30,
      marginBottom: 10,
    },
    [theme.breakpoints.up("sm")]: {
      top: 10,
      left: 100,
    },
    [theme.breakpoints.up("md")]: {
      top: 25,
      left: 170,
    },
    [theme.breakpoints.up("lg")]: {
      top: 25,
      left: 170,
    },
  },
  saveButtonFixPosition: {
    marginLeft: 20,
  },
}));

const AdminUserEdit: React.FC<Props> = ({ user, handleClose }) => {
  const [state, setState] = useState({
    checkedAdmin: user?.isAdmin,
    checkedBlocked: user?.isBlocked,
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSave = async () => {
    await dispatch(updateUser(user?.ID, state.checkedAdmin, state.checkedBlocked));
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>EDIT USER ACCESSIBILITY</h1>
      <h2>
        Here you can give user administrator features or remove it from current Administrator:
      </h2>
      <FormGroup row>
        <FormControlLabel
          className={classes.button}
          control={
            <Checkbox
              icon={<SupervisorAccountOutlinedIcon />}
              checkedIcon={<SupervisorAccountIcon />}
              checked={state.checkedAdmin}
              name="checkedAdmin"
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            state.checkedAdmin === true ? (
              <p className={classes.label}>
                Click here to
                <span className={classes.redColorWord}>remove</span>
                administrator features and click save!
              </p>
            ) : (
              <p className={classes.label}>
                Click here to
                <span className={classes.redColorWord}>add</span>
                administrator features and click save!
              </p>
            )
          }
        />
        <h2>
          Here you can block access user to the platform due to the complaints or inappropriate use
          of the service SplitUs:
        </h2>
        <FormControlLabel
          className={classes.button}
          control={
            <Checkbox
              icon={<RemoveCircleOutlineIcon />}
              checkedIcon={<RemoveCircleIcon />}
              checked={state.checkedBlocked}
              name="checkedBlocked"
              onChange={handleChange}
              color="secondary"
            />
          }
          label={
            state.checkedBlocked === true ? (
              <p className={classes.label}>
                Click here to
                <span className={classes.redColorWord}>unblock</span>
                user in service and click save!
              </p>
            ) : (
              <p className={classes.label}>
                Click here to
                <span className={classes.redColorWord}>block</span>
                user in service and click save!
              </p>
            )
          }
        />
      </FormGroup>
      <span className={classes.confirmButtons}>
        <Button onClick={handleClose} type="cancel_btn" text="Cancel" />
        <span className={classes.saveButtonFixPosition}>
          <Button onClick={handleSave} type="save_btn" text="Save" />
        </span>
      </span>
    </div>
  );
};

export default AdminUserEdit;
