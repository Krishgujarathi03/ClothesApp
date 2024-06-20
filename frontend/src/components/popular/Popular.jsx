import React, { useContext } from "react";
import "./popular.css";
// import data_product from "../assets/data";
import Item from "../item/Item";
import MyContext from "../../context/MyContext";

const Popular = () => {
  const { backend_URL, data_product } = useContext(MyContext);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => {
          const { _id, name, image, new_price, old_price } = item;
          return (
            <Item
              key={index}
              id={_id}
              name={name}
              image={backend_URL + "/images/" + image}
              new_price={new_price}
              old_price={old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
