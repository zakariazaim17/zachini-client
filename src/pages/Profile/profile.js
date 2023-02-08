import {
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { FiPackage } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiFallingStar } from "react-icons/gi";
import { GrContact, GrUserAdmin } from "react-icons/gr";
import SingleProduct from "../../components/products/singleProduct/singleProduct";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("points");
  const [userType, setUserType] = useState("user");
  const [userOrders, setUserOrders] = useState([]);
  const userId = useState(localStorage.getItem("clientId"));
  const [isUserClient, setUserClient] = useState(
    localStorage.getItem("isClient")
  );
  const userUrl = `https://zachini.herokuapp.com/${userType}/`;
  const orderUrl = `https://zachini.herokuapp.com/order/`;

  const [userDetlais, setUserDetails] = useState({
    name: "",
    email: "",
    country: "",
    date_of_birth: "",
    phone: "",
    gender: "",
    zip_code: "",
  });

  useEffect(() => {
    setUserType(localStorage.getItem("isClient") ? "user" : "admin");
  }, []);

  useEffect(() => {
    if (selectedTab === "profile") {
      getUserDetails(userType);
    } else if (selectedTab === "orders") {
      getUserOrders();
    }
  }, [selectedTab]);

  const getUserDetails = async () => {
    try {
      const userToBeFetched = await fetch(userUrl + userId[0], {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
        },
      });

      const fetched = await userToBeFetched.json();

      if (userToBeFetched.status === 500) {
        return Promise.reject(fetched);
      }

      setUserDetails(fetched[0]);

      console.log(userDetlais);

      console.log("get userDetails", fetched);
    } catch (e) {
      console.log("error", e);
    }
  };

  const uploadNewProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const fileName = document.getElementById("file").files[0];

    const url = "https://zachini.herokuapp.com/admin/newProduct/";

    formData.append("title", "bag from front");
    formData.append("description", "bagbbb");
    formData.append("price", 30000);
    formData.append("product_main_image", fileName);
    formData.append("category", "BAGS");
    formData.append("sub_category", "handbag");
    formData.append("brand", "fendi");

    try {
      const uploadedProduct = await fetch(url, {
        mode: "cors",
        method: "POST",

        headers: {
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*",
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
        },
        body: formData,
      });

      const results = await uploadedProduct.json();

      console.log("resuuuuultt", results, "uploaded", uploadedProduct);
    } catch (e) {
      console.log("errrror", e);
    }
  };

  const getUserOrders = async () => {
    try {
      const ordersToBeFetched = await fetch(orderUrl + userId[0], {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
        },
      });

      const fetched = await ordersToBeFetched.json();

      if (ordersToBeFetched.status === 500) {
        return Promise.reject(fetched);
      }

      setUserOrders(fetched);

      console.log(fetched);

      console.log("get userOrders", fetched);
    } catch (e) {
      console.log("error", e);
    }
  };

  // const adminUrl = `https://zachini.herokuapp.com/${userType}/category/${categoryName}`;

  const handleListItemClick = (event, index) => {
    setSelectedTab(index);
  };

  return (
    <div className="profile_container">
      <div className="profile_list_items">
        <List component="nav" aria-label="main mailbox folders">
          {isUserClient === "true" && (
            <ListItemButton
              selected={selectedTab === "orders"}
              onClick={(event) => handleListItemClick(event, "orders")}
            >
              <ListItemIcon>
                <FiPackage />
              </ListItemIcon>

              <ListItemText primary="Orders" />
            </ListItemButton>
          )}
          <Divider />

          {isUserClient === "true" && (
            <ListItemButton
              selected={selectedTab === "profile"}
              onClick={(event) => handleListItemClick(event, "profile")}
            >
              <ListItemIcon>
                <CgProfile />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          )}
          <Divider />

          <ListItemButton
            selected={selectedTab === "points"}
            onClick={(event) => handleListItemClick(event, "points")}
          >
            <ListItemIcon>
              <GiFallingStar />
            </ListItemIcon>
            <ListItemText primary="Earned points" />
          </ListItemButton>

          <Divider />

          <ListItemButton
            selected={selectedTab === "contact"}
            onClick={(event) => handleListItemClick(event, "contact")}
          >
            <ListItemIcon>
              <GrContact />
            </ListItemIcon>
            <ListItemText primary="Contact-us" />
          </ListItemButton>

          <Divider />

          {isUserClient === "false" && (
            <ListItemButton
              selected={selectedTab === "admin"}
              onClick={(event) => handleListItemClick(event, "admin")}
            >
              <ListItemIcon>
                <GrUserAdmin />
              </ListItemIcon>
              <ListItemText primary="Admin panel" />
            </ListItemButton>
          )}
        </List>
      </div>

      <div className="profile_content">
        {selectedTab === "orders" && (
          <>
            <p className="content_header">My orders</p>
            <Grid container spacing={1} className="orders_grid">
              {userOrders.length > 0 &&
                userOrders.map((order) => {
                  return (
                    <Grid item xs={4} key={order.product_id}>
                      <SingleProduct
                        id={order.product_id}
                        key={order._id}
                        imageUrl={order.order_image}
                        title={order.order_title}
                        price={order.order_price}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </>
        )}

        {selectedTab === "profile" && (
          <div className="inner_user_profile_container">
            <p className="profile_headers">My details</p>
            <form className="profile_update_form">
              <p className="profile_headers">Email</p>
              <input
                className="register_input"
                value={userDetlais.email || ""}
                onChange={() => {}}
                required={true}
                type="email"
              />
              <p className="profile_headers">Name</p>
              <input
                className="register_input"
                value={userDetlais.name || ""}
                onChange={() => {}}
                required={true}
                type="text"
              />

              <p className="profile_headers">Phone number</p>
              <input
                type="number"
                onChange={() => {}}
                value={userDetlais.phone || ""}
              />

              <p className="profile_headers">Gender</p>
              <input
                className="register_input"
                type="text"
                onChange={() => {}}
                value={userDetlais.gender || ""}
              />

              <p className="profile_headers">Country</p>
              <input
                className="register_input"
                type="text"
                onChange={() => {}}
                value={userDetlais.country || ""}
              />

              <p className="profile_headers">Zip code</p>
              <input
                className="register_input"
                type="number"
                onChange={() => {}}
                value={userDetlais.zip_code || ""}
              />
            </form>
          </div>
        )}
        {selectedTab === "points" && (
          <div className="earned_points_container"></div>
        )}
        {selectedTab === "contact" && <div className="contact_container"></div>}
        {selectedTab === "admin" && (
          <div className="admin_panel_container">
            <p>admin here</p>
            <form onSubmit={uploadNewProduct}>
              <input type="file" id="file"></input>

              <button type="submit"> Upload Product </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
