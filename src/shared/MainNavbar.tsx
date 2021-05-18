import React from "react";
import { useSelector } from "react-redux";

import { RootStore } from "../store/store";

const MainNavbar: React.FC = () => {
  const userInfo = useSelector((state: RootStore) => state.userSignIn);

  return <></>;
};

export default MainNavbar;
