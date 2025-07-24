import Button from "../../common/button";
import Input from "../../common/inputs/input";

const LoginForm = () => {
  return (
    <div>
      <form className="flex flex-col gap-1">
        <div>
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
        </div>
        <Button label={"Login"} type="submit" />
      </form>
    </div>
  );
};

export default LoginForm;
