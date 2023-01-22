import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";
import {
  FcAdvertising,
  FcManager,
  FcPackage,
  FcRight,
  FcRating,
} from "react-icons/fc";

import { HiOutlineLogout } from "react-icons/hi";
import { VscAccount } from "react-icons/vsc";

const MainNavigation = (props) => {
  const logout = async () => {
    try {
      localStorage.removeItem("clientToken");
      localStorage.removeItem("clientName");
      localStorage.removeItem("clientEmail");
      localStorage.removeItem("clientId");
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }
  };
  const ClientToken = localStorage.getItem("clientToken");
  return (
    <header className="main-navigation">
      <nav className="main-navigation_item1">
        <ul>
          <li>
            <NavLink to="/profile" className="kk">
              Profile <VscAccount className="uio" />
            </NavLink>
          </li>

          <li>
            <NavLink onClick={logout} to="/welcome" className="kk">
              Signout <HiOutlineLogout className="uio" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className="median_header">
        <NavLink className="median_header_logo" to="/shop">
          ZACHINI
        </NavLink>
      </nav>
      <nav className="main-navigation_item">
        {ClientToken && (
          <ul>
            <li>
              <NavLink to="/shop/sale">Sale</NavLink>
            </li>
            <li>
              <NavLink to="/shop/brand">Designers</NavLink>
            </li>
            <li>
              <NavLink to="/shop/category/clothing">Clothing</NavLink>
            </li>
            <li>
              <NavLink to="/shop/category/bags">Bags</NavLink>
            </li>
            <li>
              <NavLink to="/shop/category/shoes">Shoes</NavLink>
            </li>
            <li>
              <NavLink to="/shop/category/jwellery">Jwellery</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
