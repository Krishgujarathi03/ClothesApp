import React, { useContext } from "react";
import "./newCollections.css";
// import new_collections from "../assets/new_collections";
import Item from "../item/Item";
import MyContext from "../../context/MyContext";

const NewCollections = () => {
  const { backend_URL, new_collections } = useContext(MyContext);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, index) => {
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

export default NewCollections;
