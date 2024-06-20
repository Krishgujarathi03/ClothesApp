import React, { useContext, useEffect, useState } from "react";
import "./myOrders.css";
import MyContext from "../../context/MyContext";
import axios from "axios";
import parcel_icon from "../../components/assets/parcel_icon.png";

const MyOrders = () => {
  const context = useContext(MyContext);
  const { backend_URL, token } = context;

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.post(
      `${backend_URL}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    setData(res.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, [token]);
  return !data ? (
    <h1>No Orders</h1>
  ) : (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    // last item don't need comma
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
