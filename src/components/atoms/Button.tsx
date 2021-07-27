import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LaunchIcon from "@material-ui/icons/Launch";
import AddIcon from "@material-ui/icons/Add";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: any;
  text: string;
}

const buttonProps: any = {
  edit_btn: {
    color: "primary",
    variant: "contained",
    startIcon: <EditIcon />,
    style: {
      minWidth: 110,
    },
  },
  delete_btn: {
    color: "secondary",
    variant: "contained",
    startIcon: <DeleteIcon />,
    style: {
      minWidth: 110,
    },
  },
  signIn_btn: {
    variant: "contained",
    startIcon: <ExitToAppIcon />,
    color: "primary",
    style: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
      marginBottom: 5,
    },
  },
  logOut_btn: {
    variant: "contained",
    startIcon: <ExitToAppIcon />,
    color: "primary",
    style: {
      background: " linear-gradient(to right, #4568dc, #b06ab3)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
      marginBottom: 5,
    },
  },
  open_btn: {
    variant: "contained",
    startIcon: <LaunchIcon />,
    style: {
      background: "linear-gradient(to right, #1cd8d2, #93edc7)",
      minWidth: 110,
    },
  },
  cancel_btn: {
    color: "primary",
    variant: "outlined",
    startIcon: <CancelIcon />,
  },
  save_btn: {
    color: "secondary",
    variant: "outlined",
    startIcon: <SaveIcon />,
  },
  create_bill_btn: {
    variant: "contained",
    startIcon: <AddIcon />,
    style: {
      position: "fixed",
      right: 20,
      bottom: 18,
      background: "#FFC312",
      height: 60,
      zIndex: 120,
    },
  },
  create_faqQuestion_btn: {
    variant: "contained",
    startIcon: <AddIcon />,
    style: {
      position: "relative",
      left: 20,
      top: 30,
      background: "#fffc00",
      height: 60,
      zIndex: 120,
    },
  },
};

const IconButton: React.FC<Props> = ({ onClick, type, text }) => {
  return (
    <Button onClick={onClick} {...buttonProps[type]}>
      {text}
    </Button>
  );
};

export default IconButton;
