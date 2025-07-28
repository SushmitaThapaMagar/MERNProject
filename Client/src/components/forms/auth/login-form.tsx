import { yupResolver } from "@hookform/resolvers/yup";
import type { ILogin } from "../../../types/auth.types";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import { useForm, FormProvider } from "react-hook-form";
import { loginSchema } from "../../../schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../auth/auth.api";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();

  //configure hook form
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  //mutate is function, isPending is status
  const { mutate, isPending } = useMutation({
    //mutationFn : is
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login success response", data);
      navigate("/");
    },
    onError: (error) => {
      console.log("Login error respsonse", error);
    },
  });

  const onSubmit = (data: ILogin) => {
    mutate(data);
  };

  return (
    <div>
      {/* for events value */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <div>
            {/* Email */}
            <Input
              id={"email"}
              label={"Email"}
              name={"email"}
              placeholder={"shopkart@gmail.com"}
              type={"text"}
              rules={{
                required: "Email is Required",
              }}
              required
            />

            {/* Password */}
            <Input
              id={"password"}
              label={"Password"}
              name={"password"}
              placeholder={"********"}
              type={"password"}
              rules={{
                required: "Password is Required",
                minLength: 8,
              }}
              required
            />
          </div>
          <Button
            isDisabled={isPending}
            label={isPending ? "Logging In..." : "Login"}
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
