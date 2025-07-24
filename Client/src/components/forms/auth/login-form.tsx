import type { ILogin } from "../../../types/auth.types";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import { useForm, FormProvider } from "react-hook-form";

const LoginForm = () => {
  //configure hook form
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILogin) => {
    console.log("Form Submitted", data);
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
              type={"email"}
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
          <Button label={"Login"} type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
