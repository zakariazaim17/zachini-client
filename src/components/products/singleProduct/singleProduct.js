import { Chip } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./singleProduct.css";
const SingleProduct = (props) => {
  return (
    <NavLink className="product_container" to={`/categories/`}>
      <img src={props.imageUrl} />

      <div className="upper_block">
        <p className="product_title">{props.title}</p>
        <div className="price_block">
          {!props.discount_price ? (
            <p className="product_price">$ {props.price}</p>
          ) : (
            <p className="product_discount">$ {props.discount_price}</p>
          )}
        </div>
      </div>
      <div className="lower_block">
        {props.brand ? <Chip className="chip" label={props.brand} /> : <></>}
        {props.category ? (
          <Chip className="chip" label={props.category} />
        ) : (
          <></>
        )}
        {props.sub_category ? (
          <Chip className="chip" label={props.sub_category} />
        ) : (
          <></>
        )}
      </div>
    </NavLink>
  );
};

export default SingleProduct;
