import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Authenticate = async (props) => {
  let endPoint = props.mode;
  let userType = props.userType;

  if (props.userType === "admin") {
    endPoint = "login";
  }
  const serverUrl = `https://zachini.herokuapp.com/${userType}/${endPoint}`;

  let formData = new FormData();

  formData.append("email", props.email);
  formData.append("password", props.password);
  if (endPoint === "signUp") formData.append("name", props.name);

  try {
    const userToAuthenticate = await fetch(serverUrl, {
      method: "POST",
      body: formData,
    });

    const authResult = await userToAuthenticate.json();

    if (userToAuthenticate.status === 500) {
      return Promise.reject(authResult);
    } else {
      localStorage.setItem("clientId", authResult.clientId);
      localStorage.setItem("clientToken", authResult.clientToken);
      localStorage.setItem("clientName", authResult.clientName);
      localStorage.setItem("clientEmail", props.email);
      localStorage.setItem("isClient", props.userType === "user");

      return Promise.resolve({
        clientToken: authResult.clientToken,
        clientId: authResult.clientId,
      });
    }
  } catch (e) {
    console.log("error", e);
  }
};

export default Authenticate;
