import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now },
  },
  { minimize: false }
);

const User = mongoose.models.user || model("user", UserSchema);
export default User;
