import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./css/product.css";
const Product = (props) => {
  const productID = props.match.params.id;
  console.log(
    "passed",
    productID.productID,
    localStorage.getItem("clientToken")
  );

  const [product, setProduct] = useState([]);

  const serverUrl = `https://zachini.herokuapp.com/products/singleProduct/${productID}`;

  useEffect(() => {
    getProduct();
  }, [productID]);

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

    setProduct(fetched);

    // console.log("fetched products", fetchedProducts);
  };

  return (
    <div>
      {product.length > 0 ? (
        <>
          <div className="chips_container">
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product[0].brand}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product[0].category}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product[0].gender}
            />
            <Chip
              size="small"
              color="success"
              variant="outlined"
              className="chip"
              label={product[0].sub_category}
            />
            {product[0].tags > 0 && (
              <>
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  className="chip"
                  label={product[0].tags[0]}
                />
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  className="chip"
                  label={product[0].tags[1]}
                />
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  className="chip"
                  label={product[0].tags[2]}
                />
              </>
            )}
          </div>
          <div className="product_container">
            <div className="left_container">
              <img
                src={product[0].product_main_image}
                className="product_class_product"
              />
            </div>
            <div>
              <p className="product_title">{product[0].title}</p>
              <div className="price_container">
                <p className="price_normal">$ {product[0].price}</p>
                {product[0].discount_price !== 0 && (
                  <p className="price_discount">
                    $ {product[0].discount_price}
                  </p>
                )}
              </div>

              <p>Description: </p>
              <p>{product[0].description}</p>
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
