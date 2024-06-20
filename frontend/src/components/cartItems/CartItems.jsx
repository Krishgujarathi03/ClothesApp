import React, { useContext } from "react";
import "./cartItems.css";
import MyContext from "../../context/MyContext";
import remove_icons from "../assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    backend_URL,
  } = useContext(MyContext);

  const navigate = useNavigate();

  return cartItems.length === 0 ? (
    <h1>NO ITEM IN CART</h1>
  ) : (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item, index) => {
        const { _id, name, image, new_price } = item;

        if (cartItems[_id] > 0) {
          return (
            <div key={index}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={backend_URL + "/images/" + image}
                  alt=""
                  className="cartitems-product-icon"
                />
                <p>{name}</p>
                <p>${new_price}</p>
                <button className="cartitems-quantity">{cartItems[_id]}</button>
                <p>${new_price * cartItems[_id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icons}
                  alt=""
                  onClick={() => {
                    removeFromCart(_id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Order Summary</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          {getTotalCartAmount() === 0 ? (
            <></>
          ) : (
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
