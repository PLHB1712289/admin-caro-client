import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Progress from "../progress";
import apiService from "./apiService";
import useStyles from "./style";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = () => {
  // Style
  const classes = useStyles();

  // React router hook
  const history = useHistory();

  // State
  const [isLoad, setIsLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);

  // handle event change input form
  const _handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (isRememberMe) {
      localStorage.setItem("email", value);
    }
  };

  const _handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);

    if (isRememberMe) {
      localStorage.setItem("password", value);
    }
  };

  const _handleChangeRemeberMe = (e) => {
    const { checked } = e.target;

    setIsRememberMe(checked);

    if (checked) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  };

  // handle event submit form
  const _handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoad(true);

    const { success, message, token } = await apiService.signIn(
      email,
      password
    );

    if (success) {
      localStorage.setItem("token", token);
      history.push("/");
      setIsLoad(false);
      return;
    }

    setIsLoad(false);
    alert(message);
  };

  // handle component didmount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    } else {
      if (!localStorage.getItem("email") && !localStorage.getItem("password"))
        return;
      setEmail(localStorage.getItem("email"));
      setPassword(localStorage.getItem("password"));
      setIsRememberMe(true);
    }
  }, [history]);

  return (
    <Progress isDisplay={isLoad}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              onSubmit={_handleSubmitForm}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={_handleChangeEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={_handleChangePassword}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                checked={isRememberMe}
                onChange={_handleChangeRemeberMe}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </Progress>
  );
};

export default SignIn;
