import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginCard from "../components/templates/LoginCard";
import auth from "../auth";

const Login = () => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;

  return (
    <div>
      {userInfo?.data?.message !== "Email or password does not match!" &&
      userInfo?.data?.message !== "Password does not match!" &&
      auth.isAuthenticated() ? (
        <Redirect to="/home" />
      ) : (
        <LoginCard userInfo={userInfo} />
      )}
    </div>
  );
};

export default Login;
