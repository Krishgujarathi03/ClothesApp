import React, { useEffect, useState } from "react";
import "./listProduct.css";
import axios from "axios";
import toast from "react-hot-toast";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = ({ backend_URL }) => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const res = await axios.get(`${backend_URL}/api/product/allproducts`);
    if (res.data.success) {
      setAllProducts(res.data.products);
    } else {
      toast.error(res.data.message);
    }
  };
  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line
  }, []);

  const removeProduct = async (productId) => {
    const res = await axios.post(`${backend_URL}/api/product/removeproduct`, {
      id: productId,
    });
    await fetchInfo();
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          const { name, old_price, new_price, category, image } = product;
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={`${backend_URL}/images/` + image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{name}</p>
                <p>${old_price}</p>
                <p>${new_price}</p>
                <p>{category}</p>
                <img
                  onClick={() => {
                    removeProduct(product._id);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
