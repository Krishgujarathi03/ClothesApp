import React, { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import MyContext from "../../context/MyContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const context = useContext(MyContext);
  const { getTotalCartAmount, token, all_product, cartItems, backend_URL } =
    context;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    // eslint-disable-next-line
    all_product.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(),
    };
    let res = await axios.post(`${backend_URL}/api/order/place`, orderData, {
      headers: { token },
    });
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
      navigate("/myorders");
    } else {
      toast.error("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line
  }, [token]);
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="address"
          value={data.address}
          onChange={onChangeHandler}
          type="text"
          placeholder="Address"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="pincode"
            value={data.pincode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Pin code"
            required
          />
          <input
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          type="number"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart-Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
