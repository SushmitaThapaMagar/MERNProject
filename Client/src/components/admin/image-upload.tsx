import React, { useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface IProps {
  label: string;
  required?: boolean;
  id: string;
  multiple?: boolean;
  max?: number;
  name: string;
  // onChange?: (files: File[] | File) => void;
}

const ImageUpload: React.FC<IProps> = ({
  id,
  required = false,
  label,
  multiple = false,
  max = 5,
  name,
  // onChange,
}) => {
  const input_ref = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any>([]);
  const { control } = useFormContext();

  const {
    field: { onChange },
    formState: { errors },
  } = useController({ name, control });

  const handle_change = (files: FileList | null) => {
    console.log(files);
    if (!files) return;
    const new_images = Array.from(files);
    const updated_files = multiple
      ? [...new_images, ...images].slice(0, max)
      : [files[0]];
    setImages(updated_files);
    onChange(multiple ? updated_files : updated_files[0]);

    //onChange
    //   if (onChange) {
    //     onChange(multiple ? new_images : new_images[0]);
    //   }
  };

  const handle_remove = (image_index: number) => {
    const new_images = images.filter(
      (_: File, index: number) => index !== image_index
    );
    setImages(new_images);
    onChange(multiple ? new_images : new_images[0]);

    //onChange
  };

  return (
    <div>
      <div className="flex flex-col gap-1 w-full">
        {/* label */}
        <div className="flex">
          <label className="text-md font-bold mt-2 text-gray-800" htmlFor={id}>
            {label}
          </label>
          {required && <FaAsterisk size={8} className="text-red-800 mt-3" />}
        </div>
      </div>
      {/* input */}
      <div
        onClick={() => {
          input_ref?.current?.click();
        }}
        className={`mt-2 border-2 border-dashed border-indigo-500 rounded-lg p-6 
                 content-center text-center cursor-pointer min-h-30`}
      >
        <p className="text-sm text-gray-600 ">
          {multiple ? `Upload up to ${max} images` : "Click to Upload image"}
        </p>
        {errors[name] ? (
          <p className=" text-[12px] text-red-500 h-[8px] mt-6">
            {errors[name]?.message as string}
          </p>
        ) : (
          ""
        )}
        <input
          ref={input_ref}
          multiple={multiple}
          onChange={(e) => handle_change(e.target.files)}
          type="file"
          className="hidden"
        />
      </div>
      {/* preview */}
      {images.length > 0 && (
        <div className="w-full max-h-15 py-5 mb-10 flew gap-3">
          {images?.map((image: File, index: number) => (
            <div
              key={index}
              className="h-27 w-[100px] border border-gray-400 rounded-md"
            >
              <img
                src={URL.createObjectURL(image)}
                alt="preview_image"
                className="h-full w-full object-fill"
              />
              <div
                onClick={() => {
                  handle_remove(index);
                }}
                className="hidden group-hover:block trasition-all w-fit absolute topr-1"
              >
                <MdClose size={22} className="text-red-500 font-bold" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
