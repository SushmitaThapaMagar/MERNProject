import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category name is required"),
  description: yup.string().optional(),

  // Single cover image (not array)
  coverImage: yup
    .mixed()
    .required("Cover image is required")
    .test("file-required", "Cover image is required", (value) => {
      return value !== null && value !== undefined;
    }),

  // Multiple product images (max 5)
  images: yup
    .array()
    .of(yup.mixed())
    .required("images is required")
    .test(
      "file-required",
      "At least two product image is required",
      (value) => value && value.length > 2
    )
    .max(5, "You can upload up to 5 images only"),

  // Number-as-string validation for price
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .test(
      "positive",
      "Price must be greater than 0",
      (value) => parseFloat(value) > 0
    ),

  // Number-as-string validation for stock
  stock: yup
    .string()
    .required("Stock is required")
    .matches(/^\d+$/, "Stock must be a valid number")
    .test(
      "non-negative",
      "Stock cannot be negative",
      (value) => parseInt(value, 10) >= 0
    ),
  isFeatured: yup.boolean().required("isFeatured is required").default(false),
});
