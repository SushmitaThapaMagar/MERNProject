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
    category: {
      type: mongoose.Schema.Types.ObjectId, //returns in mongoose db idea
      ref: "category", //this is the name of the category model that is in categroySchema
      required: [true, "Category is Required"],
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
      //isFeatured is used for the features product e.g. NewArrival -- we use Feature Product as the display product or upcoming products
      type: Boolean,
      default: false,
      required: [true, "Featured is Required"],
    },
  },
  { timestamps: true }
);

//creating mongoose model
const Product = mongoose.model("product", productSchema);
export default Product;
