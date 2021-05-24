import React from "react";
import { Redirect } from "react-router-dom";
import RegisterCard from "../components/templates/RegisterCard";
import auth from "../auth";

const Register = () => {
  return <div>{auth.isAuthenticated() ? <Redirect to="/home" /> : <RegisterCard />}</div>;
};

export default Register;
