import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import auth from "../auth";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const ProtectedRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={Props => {
        if (auth.isAuthenticated()) {
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

export default ProtectedRoute;
