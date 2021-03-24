import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { login, signup } from "../redux/actions/authActions";
import { AuthBodyType } from "../Types";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: "90vh",
  },
  textFields: {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "3px 3px 0px 0px",
    marginBottom: 20,
  },
});

const SignUpIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [isLogIn, setIsLogIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    setIsLoading(true)
    const body: AuthBodyType = {
      username,
      password
    }
    if(isLogIn) {
      await dispatch(login(body))
    } else {
      await dispatch(signup(body))
    }
    setIsLoading(false)
  };

  return (
    <div>
      <Grid
        className={classes.root}
        container
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(0.5rem)",
              color: "white",
            }}
          >
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                {isLogIn ? "Login Form" : "SignUp Form"}
              </Typography>
              <TextField
                className={classes.textFields}
                name="username"
                variant="filled"
                label="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                fullWidth
              />
              <TextField
                className={classes.textFields}
                name="password"
                variant="filled"
                label="Password"
                type='password'
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                fullWidth
              />
              <Typography
                variant="button"
                style={{ fontSize: 16, cursor: "pointer" }}
                onClick={() => setIsLogIn(prevState => !prevState)}
                gutterBottom
              >
                {isLogIn ? "Dont have an account?" : "Already have an account?"} Click here
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={
                  isLoading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : null
                }
                disabled={isLoading}
                onClick={handleSubmit}
                fullWidth
              >
                {isLogIn ? "LogIn" : "SignUp"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUpIn;
