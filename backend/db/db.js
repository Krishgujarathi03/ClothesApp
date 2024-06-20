import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose
    .connect(`${process.env.MONGO_URL}/clothesApp`)
    .then(() => console.log("Database connected successfully"));
};
export default connectToDb;
