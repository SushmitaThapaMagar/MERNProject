import { FormProvider, useForm } from "react-hook-form";
import Input from "../../common/inputs/input";
import TextArea from "../../common/inputs/text-area";
import Button from "../../common/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { brand_schema } from "../../../schema/brand.schema";
import type { IBrand } from "../../../types/brand.types";
import { createBrand } from "../../../api/brand.api";

const BrandForm = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(brand_schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBrand,
    onSuccess(data) {
      toast.success(data.message || "Created Successfully");
    },
    onError(error) {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: IBrand) => {
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
            id="brand_name"
            label="Name"
            name="name"
            placeholder="HM"
            type="text"
            required
          />
          <TextArea
            id="brand_name"
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

export default BrandForm;
