import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./shared/ProtectedRoute";
import AdminRoute from "./shared/AdminRoute";
import GlobalsStyles from "./styles/globalStyles";
import Menu from "./components/molecules/Navbar";
import CurrencyConverter from "./views/CurrencyConverter";
import Footer from "./components/molecules/Footer";
import Contact from "./views/Contact";
import QuestionsFaqComponent from "./views/QuestionsFaq";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Membership from "./views/Membership";
import GroupCreator from "./views/GroupCreator";
import AdminGroups from "./views/AdminGroups";
import AdminBills from "./views/AdminBills";
import GroupDetails from "./views/GroupDetails";
import BillDetails from "./views/BillDetails";
import AdminUsers from "./views/AdminUsers";

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
        <Route path="/contact" component={Contact} />
        <Route path="/questionsFaq" component={QuestionsFaqComponent} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/membership" component={Membership} />
        <ProtectedRoute path="/groups/new" exact component={GroupCreator} />
        <ProtectedRoute path="/group/:id" exact component={GroupDetails} />
        <ProtectedRoute path="/bill/:id" exact component={BillDetails} />
        <AdminRoute exact path="/users" component={AdminUsers} />
        <AdminRoute exact path="/groups" component={AdminGroups} />
        <AdminRoute exact path="/bills" component={AdminBills} />
        <Route path="*" component={() => <div className={classes.foundError}>404 NOT FOUND</div>} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
