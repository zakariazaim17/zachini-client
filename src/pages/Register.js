import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Authenticate from "../api/authentication";
import Authcontext from "../components/context/context.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const clientEmail = useRef();
  const clientPassword = useRef();
  const clientName = useRef();
  const authcontext = React.useContext(Authcontext);

  const authenticate = async (event) => {
    event.preventDefault();
    await Authenticate({
      name: clientName.current.value,
      email: clientEmail.current.value,
      password: clientPassword.current.value,
      mode: "signUp",
    })
      .then((authenticationResult) => {
        console.log("retuned values", authenticationResult);
        authcontext.login(
          authenticationResult.clientToken,
          authenticationResult.clientId
        );
      })
      .catch((error) => {
        toast.error(`${error}`);

        console.log("error", error);
      });
  };

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <form onSubmit={authenticate}>
        <h1>Register</h1>
        <div>
          <input
            ref={clientEmail}
            required={true}
            placeholder="Email address"
            type="email"
          />
          <input
            ref={clientName}
            required={true}
            placeholder="Name"
            type="text"
          />
          <input
            ref={clientPassword}
            required={true}
            placeholder="Password"
            type="password"
          />

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
