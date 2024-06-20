import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDb from "./db/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

connectToDb();

// Api endpoints
app.use("/images", express.static("upload/images"));
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
//MONGO_URL=mongodb+srv://Krish:Krish03*@cluster0.hwv0glh.mongodb.net/?
