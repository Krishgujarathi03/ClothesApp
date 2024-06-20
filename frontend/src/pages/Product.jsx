import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/breadcrum/Breadcrum";
import ProductDisplay from "../components/productDisplay/ProductDisplay";

const Product = () => {
  const { all_product } = useContext(MyContext);
  const { productId } = useParams();

  const product = all_product.find((item) => item._id === productId);
  return !product ? (
    <h1>NO PRODUCT</h1>
  ) : (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
