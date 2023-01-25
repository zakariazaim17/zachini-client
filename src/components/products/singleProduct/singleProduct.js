import { Chip } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./singleProduct.css";
const SingleProduct = (props) => {
  return (
    <NavLink className="product_wrapper" to={`/shop/products/${props.id}`}>
      <img src={props.imageUrl} className="single_product_image" />

      <div className="upper_block">
        <p className="product_title_text">
          {props.title}
          {!props.discount_price ? (
            <p className="product_price">$ {props.price}</p>
          ) : (
            <p className="product_discount">$ {props.discount_price}</p>
          )}
        </p>
        <div className="price_block"></div>
      </div>
      <div className="lower_block">
        {props.brand ? (
          <Chip
            color="primary"
            variant="outlined"
            className="chip"
            label={props.brand}
          />
        ) : (
          <></>
        )}
        {props.category ? (
          <Chip
            color="primary"
            variant="outlined"
            className="chip"
            label={props.category}
          />
        ) : (
          <></>
        )}
        {props.sub_category ? (
          <Chip
            color="primary"
            variant="outlined"
            className="chip"
            label={props.sub_category}
          />
        ) : (
          <></>
        )}
      </div>
    </NavLink>
  );
};

export default SingleProduct;
