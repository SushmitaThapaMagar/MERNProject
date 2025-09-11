import { yupResolver } from "@hookform/resolvers/yup";
import type { ILogin } from "../../../types/auth.types";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import { useForm, FormProvider } from "react-hook-form";
import { loginSchema } from "../../../schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth.api";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Role } from "../../../types/enums";

const LoginForm = () => {
  const { setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

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
      setUser(data.user);
      setToken(data.access_token);
      console.log("Login success response", data);

      //store  user object and toek local storage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.access_token);

      //toast message show
      toast.success(data.message ?? "Login Successful");
      if (data.user.role === Role.ADMIN) {
        navigate(from ?? "/admin", { replace: true });
      } else {
        navigate(from ?? "/", { replace: true });
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "Login Failed");
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
          className="flex flex-col gap-7"
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
