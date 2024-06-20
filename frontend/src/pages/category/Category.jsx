import React, { useContext } from "react";
import "./category.css";
import MyContext from "../../context/MyContext";
import dropdown_icon from "../../components/assets/dropdown_icon.png";
import Item from "../../components/item/Item";

const Category = (props) => {
  const { all_product, backend_URL } = useContext(MyContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, index) => {
          const { _id, name, image, new_price, old_price, category } = item;

          if (props.category === category) {
            return (
              <Item
                key={index}
                id={_id}
                name={name}
                image={backend_URL + "/images/" + image}
                new_price={new_price}
                old_price={old_price}
                category={category}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore more</div>
    </div>
  );
};

export default Category;
