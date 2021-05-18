import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./shared/ProtectedRoute";
import GlobalsStyles from "./styles/globalStyles";
import Menu from "./components/molecules/Navbar";
import CurrencyConverter from "./views/CurrencyConverter";
import Footer from "./components/molecules/Footer";

const useStyles = makeStyles({
  foundError: {
    display: "flex",
    justifyContent: "center",
    fontSize: "4em",
    marginTop: "2%",
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <GlobalsStyles />
      <Menu />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/calculator" component={CurrencyConverter} />
        <ProtectedRoute path="/home" component={Home} />
        <Route path="*" component={() => <div className={classes.foundError}>404 NOT FOUND</div>} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
