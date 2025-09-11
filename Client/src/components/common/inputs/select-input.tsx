import { FaAsterisk } from "react-icons/fa";
import Select, { type SingleValue } from "react-select";

//npm i --save react-select DO THIS

interface IProps {
  options: { label: string; value: string }[];
  id: string;
  label?: string;
  error?: string;
  placeholder: string;
  required?: boolean;
  onChange: (x: any) => void;
  value: string;
}

const SelectInput: React.FC<IProps> = ({
  options,
  id,
  label = "Select an Option",
  placeholder = "Selecet an Option",
  required = false,
  onChange,
  value,
  error,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex">
        <label className="text-md font-bold mt-2 text-gray-800" htmlFor={id}>
          {label}
        </label>
        {required && <FaAsterisk size={8} className="text-red-800 mt-3 ml-1" />}
      </div>
      <Select
        options={options}
        defaultValue={options[0]}
        placeholder={placeholder}
        onChange={(option: SingleValue<{ label: string; value: string }>) => {
          onChange(option?.value);
        }}
        value={options.filter((option) => option.value === value)[0]}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            padding: "8px 0px",
            margin: "0px",
          }),
        }}
      />
      <p className="text-[12px] text-red-500 h-[8px] mt-6">
        {error ? error : ""}
      </p>
    </div>
  );
};

export default SelectInput;
