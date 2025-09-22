import { FormProvider, useForm } from "react-hook-form";
import Input from "../../common/inputs/input";
import TextArea from "../../common/inputs/text-area";
import Button from "../../common/button";
import CategorySelect from "../category-select";
import type { IProductDataFormData } from "../../../types/product.types";
import ImageUpload from "../image-upload";
import { productSchema } from "../../../schema/product.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create_product } from "../../../api/product.api";

const ProductForm = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      isFeatured: false,
    },
    resolver: yupResolver(productSchema), //schema isnot here so better create schema types
  });

  const { mutate, isPending } = useMutation({
    mutationFn: create_product,
    onSuccess: (response) => {
      toast.success(response.message || "Product Added");
    },
    onError: (error) => {
      toast.error(error.message || "Product Not Added");
    },
  });

  const handleSubmit = (data: IProductDataFormData) => {
    console.log(data);
    const {
      category,
      name,
      price,
      stock,
      coverImage,
      images,
      description,
      isFeatured,
    } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("isFeatured", isFeatured.toString());
    if (description) {
      formData.append("description", description);
    }
    formData.append("coverImage", coverImage);
    if (images) {
      images.forEach((file) => {
        formData.append("images", file);
      });
    }
    mutate(formData);
  };
  return (
    <div className="mt-8 px-10 py-10  w-[800px] mx-auto border border-gray-300 rounded-md">
      <FormProvider {...methods}>
        <form
          // @ts-expect-error // since formdata is not string
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <Input
            id="name"
            label="Product Name"
            name="name"
            placeholder="Red Wine"
            required
          />

          <CategorySelect />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="price"
              label="Product Price"
              name="price"
              placeholder="300000"
              required
            />
          </div>
          <Input
            id="stock"
            label="Total Available Items"
            name="stock"
            placeholder="15"
            required
          />
          {/* cover Image */}
          <ImageUpload
            label="Cover Image"
            id={"cover_image"}
            name={"coverImage"}
            required
          />

          {/* image */}
          <ImageUpload
            label="Images"
            id={"images"}
            name={"images"}
            required
            multiple
            max={5}
          />

          <TextArea
            id="description"
            label="Description"
            name="description"
            placeholder="Start Typing here...."
            required
          />

          <div className="flex gap-3 items-center mt-5 w-fit cursor-pointer">
            <input
              {...methods.register("isFeatured")}
              type="checkbox"
              id={"featured"}
              className=" h-4 w-4 cursor-pointer"
            />
            <label
              className="font-semibold text-md cursor-pointer"
              htmlFor="featured"
            >
              Save Featured Products
            </label>
          </div>
          <div className="w-full mt-3">
            <Button
              type="submit"
              label={isPending ? "Creating.." : "Create"}
              isDisabled={isPending}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductForm;
