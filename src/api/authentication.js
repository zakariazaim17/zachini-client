import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Authenticate = async (props) => {
  const endPoint = props.mode;
  const serverUrl = `https://zachini.herokuapp.com/user/${endPoint}`;

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
    console.log("user", authResult, "||||", userToAuthenticate);

    if (userToAuthenticate.status === 500) {
      return Promise.reject(authResult);
    } else {
      localStorage.setItem("clientId", authResult.clientId);
      localStorage.setItem("clientToken", authResult.clientToken);
      localStorage.setItem("clientName", authResult.clientName);
      localStorage.setItem("clientEmail", props.email);

      return Promise.resolve({
        clientToken: authResult.clientToken,
        clientId: authResult.clientId,
      });
    }
  } catch (e) {
    console.log("errro", e);
  }
};

export default Authenticate;
