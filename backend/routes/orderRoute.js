import express from "express";
import authMiddleware from "../middleware/auth.js";
import Stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";

const orderRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

orderRouter.post("/place", authMiddleware, async (req, res) => {
  const frontend_url = "https://clothesapp-frontend.onrender.com";
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.new_price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/myorders`,
      cancel_url: `${frontend_url}/`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});
orderRouter.post("/userorders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});
orderRouter.get("/list", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

export default orderRouter;
