import "./App.css";

import { PrivateRoute, PublicRoute } from "./helpers/MyRoutes";
import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "./components/HomePage/HomePage";
import { RegisterUserAction } from "./redux/actions/authActions";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SignIn from "./components/SignIn/SignIn";
import SignOut from "./components/SignOut/SignOut";
import SignUp from "./components/SignUp/SignUp";
import { StateInterface } from "./redux/reducers/index";
import { auth } from "./services/firebase";

function App() {
  const authenticated = useSelector<StateInterface>(
    (state) => state.auth.authenticated
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const check = async () => {
      setLoading(true);
      await auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch(RegisterUserAction(true));
        }
        setLoading(false);
      });
    };
    check();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            authenticated={authenticated}
            component={HomePage}
          ></PrivateRoute>
          <PrivateRoute
            path="/signout"
            authenticated={authenticated}
            component={SignOut}
          ></PrivateRoute>
          <PublicRoute
            path="/signup"
            authenticated={authenticated}
            component={SignUp}
          ></PublicRoute>
          <PublicRoute
            path="/signin"
            authenticated={authenticated}
            component={SignIn}
          ></PublicRoute>
          <PublicRoute
            path="/forgetPassword"
            authenticated={authenticated}
            component={ResetPassword}
          ></PublicRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
