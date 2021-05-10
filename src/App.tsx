import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./shared/ProtectedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <ProtectedRoute path="/home" component={Home} />
        <Route path="*" component={() => <div>404 NOT FOUND</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
