import React from "react";
import { Link } from "react-router";

interface IProps {
  title: string;
  link?: string;
  button_label?: string;
}

const PageTitle: React.FC<IProps> = ({ title, link, button_label }) => {
  return (
    <div className="w-full flex justify-between border-be border-indigo-200 py-5 shadow px-5 bg-[#e8e8e8] rounded-md">
      <h1 className="font-bold text-lg text-cyan-800">{title}</h1>
      {link && (
        <Link
          className="bg-orange-500 text-white font-bold px-2 py-2 rounded-md"
          to={link}
        >
          {button_label}
        </Link>
      )}
    </div>
  );
};

export default PageTitle;
