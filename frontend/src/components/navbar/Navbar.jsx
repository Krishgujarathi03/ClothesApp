import React, { useContext, useRef, useState } from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import nav_dropdown from "../assets/dropdown_icon.png";

const Navbar = () => {
  const { token, setToken, getTotalCartItems } = useContext(MyContext);

  const [state, setState] = useState("home");
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link
        style={{ textDecoration: "none" }}
        to="/"
        onClick={() => setState("home")}
      >
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>SHOPPER</p>
        </div>
      </Link>

      <img
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
        className="nav-dropdown"
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setState("home")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {state === "home" ? <hr /> : <></>}
        </li>
        <li onClick={() => setState("men")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {state === "men" ? <hr /> : <></>}
        </li>
        <li onClick={() => setState("women")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {state === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => setState("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {state === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {!token ? (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Login</button>
          </Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}

        {!token ? (
          <></>
        ) : (
          <>
            <Link style={{ textDecoration: "none" }} to="/cart">
              <img src={cart_icon} alt="" />
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
