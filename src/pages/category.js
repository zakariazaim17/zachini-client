import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../components/products/singleProduct/singleProduct";

const Category = (props) => {
  const categoryName = props.match.params.categoryName;
  console.log(
    "passed",
    categoryName.categoryName,
    localStorage.getItem("clientToken")
  );

  const [products, setProducts] = useState([]);

  const serverUrl = `https://zachini.herokuapp.com/products/category/${categoryName}`;
  useEffect(() => {
    getCategoryProducts();
  }, [categoryName]);

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

    // console.log("fetched products", fetchedProducts);
  };
  return (
    <div>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <Grid item xs={4} key={product._id + product.title}>
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
          <Grid item xs={8}>
            <p>here category</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Category;
