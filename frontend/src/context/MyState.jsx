import axios from "axios";
import MyContext from "./MyContext";
// import all_product from "../components/assets/all_product";
import { useEffect, useState } from "react";

const MyState = ({ children }) => {
  const backend_URL = "https://clothesapp-backend.onrender.com";
  const [token, setToken] = useState("");

  const [cartItems, setCartItems] = useState({});

  const [all_product, setAll_product] = useState([]);
  const [new_collections, setNew_collections] = useState([]);
  const [data_product, setData_product] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${backend_URL}/api/product/allproducts`);
      setAll_product(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getNewCollections = async () => {
    try {
      const res = await axios.get(`${backend_URL}/api/product/newcollections`);
      setNew_collections(res.data.newproducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const getPopularProducts = async () => {
    try {
      const res = await axios.get(`${backend_URL}/api/product/popular`);
      setData_product(res.data.popularproducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await getAllProduct();
      await getNewCollections();
      await getPopularProducts();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          `${backend_URL}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.log("Error adding to cart: ", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${backend_URL}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      `${backend_URL}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(res.data.cartData);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        let itemInfo = all_product?.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.new_price * quantity;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        totalItem += quantity;
      }
    }
    return totalItem;
  };

  // useEffect(() => {
  //   async function loadData() {
  //     await getAllProduct();
  //     if (localStorage.getItem("token")) {
  //       setToken(localStorage.getItem("token"));
  //     }
  //   }
  //   loadData();
  // }, []);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    backend_URL,
    token,
    setToken,
    all_product,
    new_collections,
    data_product,
  };
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export default MyState;
