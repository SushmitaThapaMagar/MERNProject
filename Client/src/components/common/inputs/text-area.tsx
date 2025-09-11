import { type FC } from "react";
import { FaAsterisk } from "react-icons/fa";
import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  type?: "text" | "number" | "email" | "password";
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  rules?: any;
}

const TextArea: FC<IProps> = ({
  id,
  label,
  name,
  placeholder,
  required = false,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex">
        <label className="text-md font-bold mt-2 text-gray-800" htmlFor={id}>
          {label}
        </label>
        {required && <FaAsterisk size={8} className="text-red-800 mt-3 ml-1" />}
      </div>
      {/* textarea input */}
      <div className="w-full flex items-center relative mt-2">
        <textarea
          {...register(name)}
          value={watch(name)}
          className={`min-h-[200px] w-full border ${
            errors[name]
              ? "border-red-600 focus:outline-red-600"
              : "border-blue-500 focus:outline-blue-500"
          } border-gray-300 p-2 w-full rounded-md placeholder:text-md text-md focus:outline-gray-400`}
          id={id}
          placeholder={placeholder}
        />
      </div>
      <p className="text-xs text-red-700 min-h-[10px]">
        {errors[name] ? errors[name] && (errors[name]?.message as string) : ""}
      </p>
    </div>
  );
};

export default TextArea;
