import mongoose from "mongoose";

//brand name
// brand controller ->CRUD
// routes from brand
//use brand route on server.ts

// update product model -> product -> add brand field =>ref .brand collection/document

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // logo: {
    //   path: {
    //     type: String,
    //     required: true,
    //   },
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    // },
  },
  { timestamps: true }
);
//create mongoose schema
const Brand = mongoose.model("brand", brandSchema);
//create mongoose model form brand
export default Brand;
