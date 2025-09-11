import { useState, type FC } from "react";
import { FaAsterisk } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

interface IProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  rules?: any;
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  type,
  placeholder,
  required = false,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  //useState is inbuiut function of React which retrun current state
  const [show, setShow] = useState<boolean>(false);

  // console.log(name, watch(name));
  // console.log(errors);
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex">
        <label className="text-md font-bold mt-2 text-gray-800" htmlFor={id}>
          {label}
        </label>
        {required && <FaAsterisk size={8} className="text-red-800 mt-3 ml-1" />}
      </div>
      {/* input */}
      <div className="w-full flex items-center relative mt-6">
        <input
          {...register(name)}
          value={watch(name)}
          className={`absolute left-0 right-0 w-full border overflow-clip ${
            errors[name]
              ? "border-red-600 focus:outline-red-600"
              : "border-blue-500 focus:outline-blue-500"
          } border-gray-300 p-2 w-full rounded-md placeholder:text-md text-md focus:outline-gray-400`}
          type={show ? "text" : type}
          id={id}
          placeholder={placeholder}
        />
        {type === "password" &&
          (show ? (
            <FaEye
              onClick={() => setShow(!show)}
              size={22}
              className="text-gray-800
              cursor-pointer
              absolute
              right-1"
            />
          ) : (
            <LuEyeClosed
              onClick={() => setShow(!show)}
              size={22}
              className="text-gray-600
              cursor-pointer
              absolute
              right-1"
            />
          ))}
      </div>
      <p className="text-xs text-red-700 min-h-[10px]">
        {errors[name] ? errors[name] && (errors[name]?.message as string) : ""}
      </p>
    </div>
  );
};

export default Input;
