import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: true },
});

const Order = mongoose.models.order || model("order", orderSchema);
export default Order;
