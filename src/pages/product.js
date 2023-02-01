import { Chip, Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../components/products/singleProduct/singleProduct";
import "./css/product.css";
const Product = (props) => {
  const productID = props.match.params.id;
  console.log("passed", productID, localStorage.getItem("clientToken"));

  const [product, setProduct] = useState();

  const [tabValue, setTabValue] = useState("SIMILAR");

  const [tabProducts, setTabProducts] = useState([]);

  const handleTabValueChange = (event, value) => {
    setTabValue(value);
  };

  const serverUrl = `https://zachini.herokuapp.com/products/singleProduct/${productID}`;

  const SimilarProductUrl = `https://zachini.herokuapp.com/products/category`;

  useEffect(() => {
    getProduct();
  }, [productID]);

  useEffect(() => {
    getSubCategoryProducts();
  }, [product]);

  const getProduct = async () => {
    const fetchedProducts = await fetch(serverUrl, {
      mode: "cors",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
      },
    });

    const fetched = await fetchedProducts.json();
    console.log("fetched products", fetched);

    setProduct(fetched[0]);

    // console.log("fetched products", fetchedProducts);
  };

  const getCustomizedProducts = () => {
    if (tabValue === "SIMILAR") {
      getSubCategoryProducts();
    } else if (tabValue === "SEEN") {
      console.log("seen products");
    }
  };

  const getSubCategoryProducts = async () => {
    if (!product) {
      return;
    }
    const fetchedProducts = await fetch(
      SimilarProductUrl + `/${product.category}/${product.sub_category}/null/4`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
        },
      }
    );
    const fetched = await fetchedProducts.json();
    console.log("fetched products", fetched);
    setTabProducts(fetched);
  };

  const getTabSelectectionProducts = () => {};

  return (
    <div>
      {product ? (
        <>
          <div className="chips_container">
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product.brand}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product.category}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product.gender}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product.sub_category}
            />
            {product.tags > 0 && (
              <>
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  className="chip"
                  label={product.tags[0]}
                />
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  className="chip"
                  label={product.tags[1]}
                />
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  className="chip"
                  label={product.tags[2]}
                />
              </>
            )}
          </div>
          <div className="product_container">
            <div className="left_container">
              <img
                src={product.product_main_image}
                className="product_class_product"
              />
            </div>
            <div>
              <p className="product_title">{product.title}</p>
              <div className="price_container">
                <p className="price_normal">$ {product.price}</p>
                {product.discount_price !== 0 && (
                  <p className="price_discount">$ {product.discount_price}</p>
                )}
              </div>

              <p>Description: </p>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="product_page_container">
            <Tabs
              value={tabValue}
              onChange={handleTabValueChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="SIMILAR" label="Similar match" />
            </Tabs>
            <div className="tab_content">
              <Grid container spacing={1} className="customized_grid">
                {tabProducts.length > 0 &&
                  tabProducts.map((product) => {
                    return (
                      <Grid item xs={2} key={product._id + product.title}>
                        <SingleProduct
                          id={product._id}
                          key={product._id}
                          imageUrl={product.product_main_image}
                          title={product.title}
                          description={product.description}
                          price={product.price}
                          discount_price={product.discount_price}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Product;
