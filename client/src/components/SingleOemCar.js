import React from "react";
import { Link } from "react-router-dom";

const SingleOemCar = ({ data }) => {
  return (
    <div class="product-grid">
      <div class="product-image">
        <Link to="#" class="image">
          <img src={data.image} alt="#" />
        </Link>
      </div>
      <div class="product-content">
        <span class="category">
          <Link href="#">{data.manufacturer}</Link>
        </span>
        <h3 class="title">
          <Link href="#">{data.name}</Link>
        </h3>
        <div class="price">₹{data.list_price}*</div>
      </div>
    </div>
  );
};

export default SingleOemCar;
