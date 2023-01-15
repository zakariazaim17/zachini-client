import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./css/shop.css";
import { Grid, ImageList } from "@mui/material";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { FcApproval } from "react-icons/fc";

const Shop = () => {
  return (
    <div className="parent_container">
      <div>
        <img
          className="image_container"
          src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/02995fd5-d3c5-4fed-830f-bfaa26eea115-0111-WW-HP-DESKTOP--promo-9-large.jpg"
        />

        <Grid container spacing={1} className="grid_container">
          <Grid item xs={4}>
            <NavLink className="median_conatainer" to={`/categories/`}>
              <img
                className="median_block_image"
                src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/41bec389-fcbe-4215-886c-32a6253d9fdc-0111-WW-HP-DESKTOP--promo-5-small.jpg"
                alt="hello"
              />
              <div className="description_median_text">
                <p className="median_block_text">Designers to check</p>
                <IoMdArrowDropright className="median_text_icon" />
              </div>
            </NavLink>
          </Grid>
          <Grid item xs={4}>
            <NavLink className="median_conatainer" to={`/categories/`}>
              <img
                className="median_block_image"
                src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/68b6efbb-8a5c-4a3b-9922-7772e78bb4b3-0111-WW-HP-DESKTOP--promo-4-small.jpg"
                alt="hello"
              />
              <div className="description_median_text">
                <p className="median_block_text">Newest products</p>
                <IoMdArrowDropright className="median_text_icon" />
              </div>
            </NavLink>
          </Grid>
          <Grid item xs={4}>
            <NavLink className="median_conatainer" to={`/categories/`}>
              <img
                className="median_block_image"
                src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/109d07d1-054e-4c9d-8f69-a6ffdbd6a901-0111-WW-HP-DESKTOP--promo-6-small.jpg"
                alt="hello"
              />
              <div className="description_median_text">
                <p className="median_block_text">Hot Items on Sale </p>
                <IoMdArrowDropright className="median_text_icon" />
              </div>
            </NavLink>
          </Grid>
        </Grid>

        <div className="top_sellers_container">
          <p>Top sellers</p>
          <Grid container spacing={1} className="grid_container">
            <Grid item xs={2}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://assetsprx.matchesfashion.com/img/product/1511835_1_large.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_sellers_text">dolce & Gabbana</p>
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://assetsprx.matchesfashion.com/img/product/1510614_1_large.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_sellers_text">Saint Laurent</p>
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://assetsprx.matchesfashion.com/img/product/1511256_1_large.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_sellers_text">Chloe </p>
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://assetsprx.matchesfashion.com/img/product/1486218_1_large.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_sellers_text">Moncler Grnebole</p>
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://assetsprx.matchesfashion.com/img/product/1504062_1_large.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_sellers_text">Zara</p>
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={2}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://assetsprx.matchesfashion.com/img/product/1437155_1_large.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_sellers_text">Versace</p>
                </div>
              </NavLink>
            </Grid>
          </Grid>
        </div>

        <div className="lower_container">
          <Grid container spacing={2} className="grid_container">
            <Grid item xs={4}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/079db9fe-1f2e-4c90-bfe8-85e0440f0e52-0111-WW-HP-DESKTOP--promo-2-medium.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_block_text">The Gucci 2023</p>
                  <IoMdArrowDropright className="median_text_icon" />
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={4}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/a39980ac-b8c8-4a16-830b-3bb10e65fad3-0111-WW-HP-DESKTOP--promo-7-medium.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_block_text">
                    high heels for the night out
                  </p>
                  <IoMdArrowDropright className="median_text_icon" />
                </div>
              </NavLink>
            </Grid>
            <Grid item xs={4}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://media.matchesfashion.com/apps/Content/Homepage/Promos/f8f33a4e-5e16-4566-bccc-e3fd5ed0042b-0111-WW-HP-DESKTOP--promo-8-medium.jpg"
                  alt="hello"
                />
                <div className="description_median_text">
                  <p className="median_block_text">cuban dress on spot</p>
                  <IoMdArrowDropright className="median_text_icon" />
                </div>
              </NavLink>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="grid_container">
            <Grid item xs={6}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <img
                  className="median_block_image"
                  src="https://media.matchesfashion.com/apps/Content/Meganav/5b35dd90-10fe-4e0d-b95f-e8daa3b0f5d1-Fine%2520Jewellery.jpg"
                  alt="hello"
                />
                <div className="description_median_text"></div>
              </NavLink>
            </Grid>
            <Grid item xs={6}>
              <NavLink className="median_conatainer" to={`/categories/`}>
                <p className="lower_text">FINE JEWELLERY</p>

                <p className="lower_description">
                  Get ahead of the curve with our finest high trend jewellery
                  from most outstanding brands <FcApproval />
                </p>
              </NavLink>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Shop;
