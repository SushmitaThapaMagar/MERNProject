import type { FC } from "react";

interface IProps {
  label: string;
  type?: "submit" | "button" | "reset";
}

const Button: FC<IProps> = ({ label, type = "button" }) => {
  return (
    <div>
      <button
        className=" tracking-wider bg-orange-600 hover:bg-orange-800  transition-all duration-300 w-full p-2 rounded-md font-bold text-md text-white cursor-pointer mt-3"
        type={type}
      >
        {label}
      </button>

      <div className="mt-3 text-center">
        <p className="mt-1">
          Do not have an account?
          <span className="text-orange-700 font-bold cursor-pointer">
            {" "}
            Sign Up
          </span>
        </p>
        <p className="mt-1">
          <i>
            <span className="text-orange-700 font-m cursor-pointer">
              Forgot Password?
            </span>
          </i>
        </p>
      </div>
    </div>
  );
};
export default Button;
