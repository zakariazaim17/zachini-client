import React, { useRef, useState } from "react";
import Authenticate from "../api/authentication.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authcontext from "../components/context/context.js";
import "./css/login.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Button, Grid, Tab, Tabs } from "@mui/material";
import { NavLink } from "react-router-dom";
toast.configure();

const Login = () => {
  const clientEmail = useRef();
  const clientPassword = useRef();

  const [tabValue, setTabValue] = useState("user");

  const authcontext = React.useContext(Authcontext);

  const handleTabValueChange = (event, value) => {
    setTabValue(value);
  };

  const authenticate = async (event) => {
    event.preventDefault();
    await Authenticate({
      email: clientEmail.current.value,
      password: clientPassword.current.value,
      mode: "login",
      userType: tabValue,
    })
      .then((value) => {
        console.log("vaal", value);
        authcontext.login(value.clientToken, value.clientId);
      })
      .catch((error) => {
        toast.error(`${error}`);

        console.log("error", error);
      });
  };

  return (
    <div className="parent_container">
      <div>
        <ToastContainer />
      </div>

      <Grid container spacing={0} className="grid_container">
        <Grid item xs={4}>
          <div className="median_conatainer">
            <img
              className="median_block_image"
              src="https://img.freepik.com/premium-vector/black-white-retro-fashion-model-sketch-style-hand-drawn-vector-illustration_231873-9484.jpg"
              alt="hello"
            />
            <div className="description_median_text"></div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="form_container">
            <div className="login-tab-selection-mode">
              <Tabs
                value={tabValue}
                onChange={handleTabValueChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="user" label="Client" />

                <Tab value="admin" label="Admin" />
              </Tabs>
            </div>
            <form onSubmit={authenticate} className="login_form">
              <h1>Login</h1>

              <input
                className="login_input"
                ref={clientEmail}
                required={true}
                placeholder="Email address"
                type="email"
              />
              <input
                className="login_input"
                ref={clientPassword}
                required={true}
                placeholder="Password"
                type="password"
              />
              <Button
                className="login_button"
                variant="outlined"
                color="secondary"
                type="submit"
                size="small"
              >
                Login
              </Button>
            </form>
            <NavLink to={`/register`} className="register_account_button">
              <p>Don't have an account? Register</p>
            </NavLink>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="median_conatainer">
            <img
              className="median_block_image"
              src="https://img.freepik.com/premium-vector/black-white-retro-fashion-model-sketch-style-hand-drawn-vector-illustration_231873-9522.jpg"
              alt="hello"
            />
            <div className="description_median_text"></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
