import * as yup from "yup";

import React, { useState } from "react";

import { LogOutUser } from "../../redux/actions/authActions";
import { auth } from "../../services/firebase";
import { signout } from "../../helpers/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const SignOut: React.FC = () => {
  const [googleAuthErrors, setGoogleAuthErrors] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    try {
      await signout();
      setGoogleAuthErrors("");
      dispatch(LogOutUser(false));
      history.push("/signin");
    } catch (err) {
      console.log(err.message);
      setGoogleAuthErrors(err.message);
    }
  };

  return (
    <div>
      <h1>Sign Out</h1>
      <p>{googleAuthErrors}</p>
      <button onClick={onSubmit}>SignOut</button>
    </div>
  );
};

export default SignOut;
