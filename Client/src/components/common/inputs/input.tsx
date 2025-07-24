import type { FC } from "react";
import { FaAsterisk } from "react-icons/fa";

interface IProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  type,
  placeholder,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex">
        <label className="text-md font-bold mt-2 text-gray-800" htmlFor={id}>
          {label}
        </label>
        {required && <FaAsterisk size={8} className="text-red-800 mt-3 ml-1" />}
      </div>
      {/* input */}
      <input
        className="border border-gray-300 p-2 rounded-md placeholder:text-md text-md focus:outline-gray-400"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
