import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../components/products/singleProduct/singleProduct";

const Category = (props) => {
  const categoryName = props.match.params.categoryName;

  const [products, setProducts] = useState([]);

  const serverUrl = `https://zachini.herokuapp.com/products/category/${categoryName}`;
  useEffect(() => {
    getCategoryProducts();
  }, [categoryName]);

  const getCategoryProducts = async () => {
    try {
      const fetchedProducts = await fetch(serverUrl, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
        },
      });

      const fetched = await fetchedProducts.json();
      if (typeof fetchedProducts === "string") {
        return console.log("error formatting");
      }

      setProducts(fetched);
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        {products.length > 0 && typeof products !== "string" ? (
          (console.log("product", products),
          products.map((product) => {
            return (
              <Grid item xs={4} key={product._id + product.title}>
                <SingleProduct
                  id={product._id}
                  key={product._id}
                  imageUrl={product.product_main_image}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  discount_price={product.discount_price}
                  brand={product.brand}
                  sub_category={product.sub_category}
                />
              </Grid>
            );
          }))
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export default Category;
