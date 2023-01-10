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

const MainNavigation = (props) => {
  const logout = async () => {
    try {
      localStorage.removeItem("ClientToken");
      localStorage.removeItem("CurentcliEnt");
      localStorage.removeItem("cl");
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
            <NavLink to="/profile">Account</NavLink>
          </li>
          <li>
            <NavLink to="/favourites">whishList</NavLink>
          </li>
          <li>
            <NavLink onClick={logout} to="/welcome">
              Logout
              <FcRight className="uio" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className="upperHeader">
        <NavLink className="main-navigation_logo" to="/shop">
          ZACHINI
        </NavLink>
      </nav>
      <nav className="main-navigation_item">
        {ClientToken && (
          <ul>
            <li>
              <NavLink to="/favourites">Sale</NavLink>
            </li>
            <li>
              <NavLink to="/favourites">Designers</NavLink>
            </li>
            <li>
              <NavLink to="/favourites">Clothing</NavLink>
            </li>
            <li>
              <NavLink to="/favourites">Bags</NavLink>
            </li>
            <li>
              <NavLink to="/favourites">Shoes</NavLink>
            </li>
            <li>
              <NavLink to="/favourites">Jwellery</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
