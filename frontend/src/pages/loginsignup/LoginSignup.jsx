import React, { useContext, useState } from "react";
import "./loginsignup.css";
import axios from "axios";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const { backend_URL, setToken } = useContext(MyContext);
  const [state, setState] = useState("Signup");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const signup = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${backend_URL}/api/user/signup`, data);
    console.log(res);
    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Sign Up Successfully");
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };
  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${backend_URL}/api/user/login`, data);
    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successfully");
      navigate("/");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state === "Signup" ? "Sign Up" : "Sign In"}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" ? (
            <input
              onChange={changeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Name"
            />
          ) : (
            <></>
          )}
          <input
            onChange={changeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={changeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={(e) => {
            state === "Signup" ? signup(e) : login(e);
          }}
        >
          Continue
        </button>
        <p className="loginsignup-login">
          {state === "Signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <span
            onClick={() => {
              state === "Signup" ? setState("Login") : setState("Signup");
            }}
            style={{ cursor: "pointer" }}
          >
            {state === "Signup" ? " Login" : " Sign Up"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            {state === "Signup"
              ? "I agree to the terms and services."
              : "Remember me"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
