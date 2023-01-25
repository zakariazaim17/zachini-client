import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../components/products/singleProduct/singleProduct";

const Sale = () => {
  const [products, setProducts] = useState([]);
  const serverUrl = `https://zachini.herokuapp.com/products/sale`;

  useEffect(() => {
    getCategoryProducts();
  }, []);

  const getCategoryProducts = async () => {
    const fetchedProducts = await fetch(serverUrl, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
      },
    });

    const fetched = await fetchedProducts.json();
    console.log("fetched products", fetched);

    setProducts(fetched);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <Grid item xs={3} key={product._id + product.title}>
                <SingleProduct
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
          })
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export default Sale;
