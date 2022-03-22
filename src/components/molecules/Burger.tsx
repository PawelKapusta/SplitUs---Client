import React, { useState } from "react";
import * as S from "../../styles/navbarElements";

import RightNav from "./RightNav";

const Burger: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <S.StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </S.StyledBurger>
      <RightNav open={open} />
    </>
  );
};
export default Burger;
