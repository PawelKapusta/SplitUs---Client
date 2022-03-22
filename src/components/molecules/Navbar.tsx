import React from "react";
import { NavLink } from "react-router-dom";
import * as S from "../../styles/navbarElements";
import Logo from "../../assets/images/Logo.png";
import Burger from "./Burger";

interface Props {
  children?: any;
}

const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavLink to="/">
        <S.Nav>
          <S.Logo src={Logo} alt="Logo" />
        </S.Nav>
      </NavLink>
      <Burger />
      {children}
    </>
  );
};

export default Navbar;
