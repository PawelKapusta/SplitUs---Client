import React from "react";
import { NavLink } from "react-router-dom";
import * as S from "../../styles/navbarElements";
import Logo from "../../assets/images/Logo.png";
import Button from "../atoms/Button";

type Props = {
  open: boolean;
};

const RightNav: React.FC<Props> = ({ open }) => {
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
        <NavLink to="/login">
          <S.LoginButton>
            <Button type="login_btn" text="Sign In" />
          </S.LoginButton>
        </NavLink>
      </S.Ul>
    </>
  );
};

export default RightNav;
