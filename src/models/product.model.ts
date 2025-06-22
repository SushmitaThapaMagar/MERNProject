import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    description: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is Required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is Required"],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      required: [true, "Featured is Required"],
    },
  },
  { timestamps: true }
);

//creating mongoose model
const Product = mongoose.model("product", productSchema);
export default Product;
