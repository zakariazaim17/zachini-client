import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../components/products/singleProduct/singleProduct";
import "./css/brand.css";
const Brand = () => {
  const [brandValue, setBrandValue] = useState("GUCCI");
  const handleBrandChange = (event) => {
    setBrandValue(event.target.value);
  };

  const [products, setProducts] = useState([]);

  const serverUrl = `https://zachini.herokuapp.com/products/brand/${brandValue}`;

  useEffect(() => {
    getCategoryProducts();
  }, [brandValue]);

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
      <RadioGroup
        row
        className="brands_container"
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="GUCCI"
        name="radio-buttons-group"
        value={brandValue}
        onChange={handleBrandChange}
      >
        <FormControlLabel value="GUCCI" control={<Radio />} label="Gucci" />
        <FormControlLabel
          value="VALENTINO"
          control={<Radio />}
          label="Valentino"
        />
        <FormControlLabel value="CHANEL" control={<Radio />} label="Chanel" />
        <FormControlLabel
          value="LOUIS_VUITTON"
          control={<Radio />}
          label="Louis vuitton"
        />
        <FormControlLabel
          value="BALENCIAGA"
          control={<Radio />}
          label="Balenciaga"
        />
        <FormControlLabel value="CELINE" control={<Radio />} label="Celine" />
        <FormControlLabel
          value="GIVENCHY"
          control={<Radio />}
          label="Givenchy"
        />
        <FormControlLabel
          value="SAINT_LAURENT"
          control={<Radio />}
          label="Saint laurent"
        />
        <FormControlLabel value="FENDI" control={<Radio />} label="Fendi" />
        <FormControlLabel value="VERSACE" control={<Radio />} label="Versace" />
        <FormControlLabel value="DIOR" control={<Radio />} label="Dior" />
        <FormControlLabel
          value="BURBERRY"
          control={<Radio />}
          label="Burberry"
        />
        <FormControlLabel value="PRADA" control={<Radio />} label="Prada" />
      </RadioGroup>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => {
            return (
              <Grid item xs={4} key={product._id + product.title}>
                <SingleProduct
                  key={product._id}
                  imageUrl={product.product_main_image}
                  title={product.title}
                  price={product.price}
                  discount_price={product.discount_price}
                  category={product.category}
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

export default Brand;
