import { FormProvider, useForm } from "react-hook-form";
import Input from "../../common/inputs/input";
import TextArea from "../../common/inputs/text-area";
import Button from "../../common/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { category_schema } from "../../../schema/category.schema";
import type { ICategory } from "../../../types/category.types";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../../../api/category.api";
import toast from "react-hot-toast";

const CategoryForm = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(category_schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess(data) {
      toast.success(data.message || "Created Successfully");
      methods.reset();
    },
    onError(error) {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: ICategory) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div className="p-6 w-[600px] mx-auto border border-gray-300 rounded-md mt-10 bg-[#f8f8f8]">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Input
            id="category_name"
            label="Name"
            name="name"
            placeholder="Electronics"
            type="text"
            required
          />
          <TextArea
            id="category_name"
            label="Description"
            name="description"
            placeholder="Start type here....."
            type="text"
            required
          />
          <Button
            label={isPending ? "Creating..." : "Create"}
            type="submit"
            isDisabled={isPending}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CategoryForm;
