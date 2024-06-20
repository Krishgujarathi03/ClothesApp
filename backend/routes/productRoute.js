import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import fs from "fs";
const productRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "upload/images",
  filename: (req, file, callback) => {
    return callback(
      null,
      `${file.fieldname}_${Date.now()}_${file.originalname}`
    );
  },
});
const upload = multer({ storage: storage });

productRouter.post("/addproduct", upload.single("image"), async (req, res) => {
  let image_filename = `${req.file?.filename}`;

  const product = new Product({
    name: req.body.name,
    image: image_filename,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  try {
    await product.save();
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

productRouter.post("/removeproduct", async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    fs.unlink(`upload/images/${product?.image}`, () => {});

    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

productRouter.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

productRouter.get("/newcollections", async (req, res) => {
  try {
    let products = await Product.find({});
    // This will give latest 8 products from all the products
    let newCollections = products.slice(1).slice(-8);
    res.json({
      success: true,
      newproducts: newCollections,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

productRouter.get("/popular", async (req, res) => {
  try {
    let products = await Product.find({ category: "Womens" });
    // This will give latest 8 products from all the products
    let popular = products.slice(0, 4);
    res.json({
      success: true,
      popularproducts: popular,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

export default productRouter;
