import type { FC } from "react";

interface IProps {
  label: string;
  type?: "submit" | "button" | "reset";
  isDisabled?: boolean;
}

const Button: FC<IProps> = ({ label, type = "button", isDisabled = false }) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        className="disabled:cursor-not-allowed disabled: tracking-wider bg-cyan-700 hover:text-cyan-800  transition-all duration-300 w-full p-2 rounded-md font-bold text-md text-white cursor-pointer mt-3"
        type={type}
      >
        {label}
      </button>
    </div>
  );
};
export default Button;
