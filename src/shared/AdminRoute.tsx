import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import auth from "../auth";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const AdminRoute = (props: PrivateRouteProps) => {
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={Props => {
        if (auth.isAuthenticated() && userInfo?.data?.isAdmin) {
          return <Component {...Props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: Props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default AdminRoute;
