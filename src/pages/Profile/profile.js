import {
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { FiPackage } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiFallingStar } from "react-icons/gi";
import { GrContact, GrUserAdmin } from "react-icons/gr";
import SingleProduct from "../../components/products/singleProduct/singleProduct";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("contact");
  const [userType, setUserType] = useState("user");
  const [userOrders, setUserOrders] = useState([]);
  const userId = useState(localStorage.getItem("clientId"));
  const [isUserClient, setUserClient] = useState(
    localStorage.getItem("isClient")
  );
  const [isSale, setSale] = useState(false);
  const userUrl = `https://zachini.herokuapp.com/${userType}/`;
  const orderUrl = `https://zachini.herokuapp.com/order/`;

  const product_title = useRef();
  const product_description = useRef();
  const product_price = useRef();
  const product_category = useRef();
  const product_sub_category = useRef();
  const product_brand = useRef();
  const product_sale_price = useRef();

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
    } catch (e) {
      console.log("error", e);
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
    } catch (e) {
      console.log("error", e);
    }
  };

  const uploadNewProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const fileName = document.getElementById("file").files[0];

    const url = "http://localhost:5000/admin/newProduct/";

    formData.append("title", product_title.current.value);
    formData.append("description", product_description.current.value);
    formData.append("price", product_price.current.value);
    formData.append("product_main_image", fileName);
    formData.append("category", product_category.current.value);
    formData.append("sub_category", product_sub_category.current.value);
    formData.append("brand", product_brand.current.value);

    if (isSale && product_sale_price.current.value) {
      formData.append("is_available_for_sale", true);
      formData.append("discount_price", product_sale_price.current.value);
    }

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

      const results = await uploadedProduct.json;
    } catch (e) {
      console.log("error", e);
    }
  };

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
          <Divider />

          {isUserClient === "false" && (
            <ListItemButton
              selected={selectedTab === "product_admin"}
              onClick={(event) => handleListItemClick(event, "product_admin")}
            >
              <ListItemIcon>
                <GrUserAdmin />
              </ListItemIcon>
              <ListItemText primary="Product panel" />
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

        {selectedTab === "contact" && (
          <div className="contact_container">
            <p className="profile_headers_2">Contact us</p>
            <div className="inner-contact-us">
              <p>
                Available Monday - Saturday 9am - 9pm and 9am - 7:30pm on Sunday
              </p>
              <p>
                We receive phone calls from Monday - Friday 9am - 4pm
                (+3581234357682)
              </p>
              <p>
                for your visit please see our location on the map below, open
                Monday - Wednesday 11am - 15pm
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7937.805853568109!2d24.933584350052254!3d60.173259334009444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bcdd0b20e9f%3A0x2600b5523c1977c1!2sKluuvi%2C%20Helsinki!5e0!3m2!1sen!2sfi!4v1677453403087!5m2!1sen!2sfi"
                height="300"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
        {selectedTab === "admin" && (
          <div className="admin_panel_container">
            <p>admin here</p>
            <form onSubmit={uploadNewProduct}>
              <input type="file" id="file"></input>

              <button type="submit"> Upload Product </button>
            </form>
          </div>
        )}
        {selectedTab === "product_admin" && (
          <div className="admin_panel_container">
            <p>add product</p>
            <form onSubmit={uploadNewProduct}>
              <input type="file" id="file"></input>

              <button type="submit"> Upload Product </button>

              <input
                className="login_input"
                ref={product_title}
                required={true}
                placeholder="Title"
                type="text"
              />
              <input
                className="login_input"
                ref={product_description}
                required={true}
                placeholder="Description"
                type="text"
              />
              <input
                className="login_input"
                ref={product_price}
                required={true}
                placeholder="Price"
                type="number"
              />
              <input
                className="login_input"
                ref={product_category}
                required={true}
                placeholder="Category"
                type="text"
              />
              <input
                className="login_input"
                ref={product_sub_category}
                required={true}
                placeholder="Sub category"
                type="text"
              />
              <input
                className="login_input"
                ref={product_brand}
                required={true}
                placeholder="brand"
                type="text"
              />
              <div className="sale_container">
                <p>product available for sale</p>
                <Switch
                  size="small"
                  checked={isSale}
                  onChange={() => setSale(!isSale)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {isSale && (
                <input
                  className="login_input"
                  ref={product_sale_price}
                  required={true}
                  placeholder="sale price"
                  type="number"
                />
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
