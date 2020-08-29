import * as yup from "yup";

import React, { useState } from "react";

import { Alert } from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { resetpassword } from "../../helpers/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

const ResetPassword: React.FC = () => {
  const [googleAuthErrors, setGoogleAuthErrors] = useState("");
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const onSubmit = async (data: any) => {
    setGoogleAuthErrors("");
    try {
      await resetpassword(data.Email);
      setOpen(true);
    } catch (err) {
      console.log(err.message);
      setGoogleAuthErrors(err.message);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
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
            inputRef={register}
          />

          {errors.Email && (
            <Alert severity="error">{errors.Email.message}</Alert>
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
            Reset Password
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Reset Email is Successfully Sent!
          </Alert>
        </Snackbar>
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
});
export default ResetPassword;
