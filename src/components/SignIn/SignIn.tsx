import * as yup from "yup";

import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useState } from "react";
import { signInWithGoogle, signin } from "../../helpers/auth";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { RegisterUserAction } from "../../redux/actions/authActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../services/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers";

const SignIn: React.FC = () => {
  const [googleAuthErrors, setGoogleAuthErrors] = useState("");
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const onSubmit = async (data: any) => {
    setGoogleAuthErrors("");
    try {
      await signin(data.Email, data.Password);

      dispatch(RegisterUserAction(true));
      history.push("/");
    } catch (err) {
      console.log(err.message);
      setGoogleAuthErrors(err.message);
    }
  };
  const googleSignInHandler = async () => {
    setGoogleAuthErrors("");
    try {
      await signInWithGoogle();
      dispatch(RegisterUserAction(true));
      history.push("/");
    } catch (err) {
      console.log(err.message);
      setGoogleAuthErrors(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          method="post"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // id="email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            // id="password"
            autoComplete="current-password"
            inputRef={register({ required: "Password is Required" })}
          />
          {errors.Email && (
            <Alert severity="error">{errors.Email.message}</Alert>
          )}
          {errors.Password && (
            <Alert severity="error">{errors.Password.message}</Alert>
          )}
          {googleAuthErrors.length === 0 ? null : (
            <Alert severity="error">{googleAuthErrors}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={googleSignInHandler}
            className={classes.submit2}
          >
            Sign In with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgetPassword">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">Don't have an account? Sign Up"</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submit2: {
    margin: theme.spacing(0, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Yumsta</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const schema = yup.object().shape({
  Email: yup.string().required().email(),
  Password: yup.string().required().min(6),
});
export default SignIn;
