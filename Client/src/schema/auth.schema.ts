import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("invalid email format"),
  password: yup.string().required("Password is required"),
});

export const RegisterSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("First name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be 8 char long"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password must match"),
});
