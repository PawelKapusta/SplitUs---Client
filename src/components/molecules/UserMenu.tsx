import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { RootStateOrAny, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import auth from "../../auth";

const useStyles = makeStyles({
  userButton: {
    background: "linear-gradient(to right, #457fca, #5691c8)",
    height: "55px",
    color: "white",
  },
  adminButton: {
    background: "linear-gradient(to right, #e53935, #e35d5b)",
    height: "55px",
    color: "white",
  },
  link: {
    textAlign: "center",
    textDecoration: "none",
    width: "135px",
    margin: "auto",
    fontSize: "1.1em",
    color: "#8c7ae6",
    "&:visited, &:active": {
      color: "#8c7ae6",
    },
  },
  adminLink: {
    textAlign: "center",
    textDecoration: "none",
    width: "135px",
    margin: "auto",
    fontSize: "1.1em",
    color: "#c23616",
    "&:visited, &:active": {
      color: "#c23616",
    },
  },
});

const UserMenu = () => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(userInfo?.data?.isAdmin);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsAdmin(userInfo?.data?.isAdmin);
  });

  return (
    <div>
      <Button
        className={isAdmin ? classes.adminButton : classes.userButton}
        aria-controls="fade-menu"
        aria-haspopup="true"
        variant="contained"
        endIcon={<ArrowDropDownCircleIcon />}
        onClick={handleClick}>
        {isAdmin ? "Admin menu" : "User menu"}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/membership">
            My membership
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/groups/new">
            Create group
          </Link>
        </MenuItem>
        {isAdmin ? (
          <span>
            <MenuItem onClick={handleClose}>
              <Link className={classes.adminLink} to="/users">
                Users
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.adminLink} to="/groups">
                Groups
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className={classes.adminLink} to="/bills">
                Bills
              </Link>
            </MenuItem>
          </span>
        ) : (
          ""
        )}
      </Menu>
    </div>
  );
};

export default UserMenu;
