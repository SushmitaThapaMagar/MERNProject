import { FormProvider, useForm } from "react-hook-form";
import Button from "../../common/button";
import Input from "../../common/inputs/input";
import type { IRegister } from "../../../types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../../schema/auth.schema";

const RegisterForm = () => {
  //configure hooks
  const methods = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(RegisterSchema),
    mode: "all",
  });

  const onSubmit = (data: IRegister) => {
    console.log("Registered Successfully", data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-1"
        >
          <div>
            {/* border-white w-full flex flex-col md:flex-row gap-3 */}
            <div className="border border-white w-full flex flex-col md:flex-row gap-5">
              {/*First Name */}
              <Input
                id={"first_name"}
                label={"First Name"}
                name={"first_name"}
                placeholder={"Shop"}
                rules={{
                  required: "First Name is Required",
                }}
                required
              />
              {/*Last Name */}
              <Input
                id={"last_name"}
                label={"Last Name"}
                name={"last_name"}
                placeholder={"Kart"}
                rules={{
                  required: "Last Name is Required",
                }}
                required
              />
            </div>

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
            {/* Confirm Password */}
            <Input
              id={"confirm_password"}
              label={"Confirm Password"}
              name={"confirm_password"}
              placeholder={"********"}
              rules={{
                required: "Need to confirm password again!",
              }}
              required
            />
          </div>

          <Button label={"Register"} type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
