import express from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    let cartData = await user.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

cartRouter.post("/remove", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    let cartData = await user.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

cartRouter.post("/get", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    let cartData = await user.cartData;

    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

export default cartRouter;
