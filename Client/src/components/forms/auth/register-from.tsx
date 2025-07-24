import Button from "../../common/button";
import Input from "../../common/inputs/input";

const RegisterForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-4">
        <div>
          <div className="border border-white w-full flex flex-col md:flex-row gap-3">
            {/*First  Name */}
            <Input
              id={"first_name"}
              label={"First Name"}
              name={"first_name"}
              placeholder={"Shop"}
              required
            />
            {/*Last Name */}
            <Input
              id={"last_name"}
              label={"Last Name"}
              name={"last_name"}
              placeholder={"Kart"}
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
            required
          />

          {/* Password */}
          <Input
            id={"password"}
            label={"Password"}
            name={"password"}
            placeholder={"********"}
            type={"password"}
            required
          />
          {/* Confirm Password */}
          <Input
            id={"confirm-password"}
            label={"Confirm Password"}
            name={"confirm-password"}
            placeholder={"Retype Password"}
            required
          />
        </div>

        <Button label={"Register"} type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
