import React, { useState } from "react";
import "./addProduct.css";
import upload_area from "../../assets/upload_area.svg";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = ({ backend_URL }) => {
  const [image, setImage] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "Womens",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", productDetails.name);
    formData.append("old_price", Number(productDetails.old_price));
    formData.append("new_price", Number(productDetails.new_price));
    formData.append("category", productDetails.category);
    const res = await axios.post(
      `${backend_URL}/api/product/addproduct`,
      formData
    );
    if (res.data.success) {
      setProductDetails({
        name: "",
        old_price: "",
        new_price: "",
        category: "Womens",
      });
      setImage(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    console.log(productDetails);
  };
  return (
    <form onSubmit={handleSubmit} className="add-product">
      <div className="addproduct-itemfield">
        <p>Name</p>
        <input
          onChange={onChangeHandler}
          type="text"
          name="name"
          value={productDetails.name}
          placeholder="Name"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            onChange={onChangeHandler}
            type="number"
            name="old_price"
            value={productDetails.old_price}
            placeholder="Old Price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            onChange={onChangeHandler}
            type="number"
            name="new_price"
            value={productDetails.new_price}
            placeholder="New Price"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select
          onChange={onChangeHandler}
          name="category"
          value={productDetails.category}
          className="add-product-selector"
        >
          <option value="Womens">Womens</option>
          <option value="Mens">Mens</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button type="submit" className="addproduct-btn">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default AddProduct;
