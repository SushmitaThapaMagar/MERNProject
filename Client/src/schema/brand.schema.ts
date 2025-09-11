import * as yup from "yup";

export const brand_schema = yup.object({
  name: yup.string().required("brand name is required"),
  description: yup.string().optional(),
});
