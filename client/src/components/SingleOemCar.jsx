import { Flex, Text } from "@chakra-ui/react";
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
        <div class="category">
          <Link href="#">{data.manufacturer} <span class="title" >{data.name} {data.year}</span> </Link>
        </div>
        {/* <span class="title" >{data.year}</span> */}
        <div class="price">₹{data.list_price}*</div>
      </div>
      <Text mt="-5px" color="#000" textAlign="left" ml="10px"  fontSize="16px" fontWeight="600" > mileage: <span class="color__av" >{data.mileage}</span></Text>
      <Flex mb="10px" flexDir="column" alignItems="flex-start" px="10px" >
        <Text color="#000" fontSize="16px" fontWeight="600" > power: <span class="color__av" >{data.power}</span></Text>
        <Text color="#000" fontSize="16px" fontWeight="600" > max-speed: <span class="color__av" >{data.max_speed}</span></Text>
      </Flex>
      {/* <Flex>
        <Text color="#000" fontSize="18px" fontWeight="600" > colors: <span class="color__av" >{data.available_colors.map((el) => `${el}, `)}</span></Text>
      </Flex> */}
    </div>
  );
};

export default SingleOemCar;
