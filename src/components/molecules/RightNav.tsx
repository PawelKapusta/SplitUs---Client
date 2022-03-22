import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import * as S from "../../styles/navbarElements";
import Logo from "../../assets/images/Logo.png";
import Button from "../atoms/Button";
import { signOut } from "../../store/actions/userActions";
import auth from "../../auth";
import UserMenu from "./UserMenu";

type Props = {
  open: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      marginLeft: theme.spacing(3),
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }),
);

const RightNav: React.FC<Props> = ({ open }) => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const [isAuth, setIsAuth] = useState<boolean>(auth.isAuthenticated());
  const [image, setImage] = useState(userInfo?.data?.AvatarImage);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSignOutClick = () => {
    dispatch(signOut());
    setIsAuth(!isAuth);
  };

  useEffect(() => {
    setImage(userInfo?.data?.AvatarImage);
  });

  return (
    <>
      <S.Ul open={open}>
        <NavLink to="/">
          <S.LogoUl src={Logo} alt="Logo" />
        </NavLink>
        <NavLink
          to="/"
          activeStyle={{
            fontWeight: "bold",
            color: "#E73C48",
          }}>
          <li>Dashboard</li>
        </NavLink>
        <NavLink
          to="/calculator"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA",
          }}>
          <li>Currency converter</li>
        </NavLink>
        <NavLink
          to="/contact"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA",
          }}>
          <li>Contact</li>
        </NavLink>
        <NavLink
          to="/questionsFaq"
          activeStyle={{
            fontWeight: "bold",
            color: "#0DADEA",
          }}>
          <li>Questions FAQ</li>
        </NavLink>
        {isAuth ? (
          <S.UserMenu>
            <UserMenu />{" "}
          </S.UserMenu>
        ) : (
          ""
        )}
        {isAuth ? (
          <NavLink to="/">
            <S.LoginButton>
              <Button type="logOut_btn" text="Sign Out" onClick={handleSignOutClick} />
            </S.LoginButton>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <S.LoginButton>
              <Button type="signIn_btn" text="Sign In" />
            </S.LoginButton>
          </NavLink>
        )}
        {userInfo && isAuth ? (
          <S.AvatarImage>
            <Avatar className={classes.large} alt={userInfo?.data?.FullName} src={image} />
          </S.AvatarImage>
        ) : (
          ""
        )}
      </S.Ul>
    </>
  );
};

export default RightNav;
