import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../auth";

const ProtectedRoute: React.FC = ({ Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
