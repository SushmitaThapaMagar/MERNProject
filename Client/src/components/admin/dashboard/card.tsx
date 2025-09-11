import React from "react";

interface IProps {
  label: string;
  count: number;
}

const CountCard: React.FC<IProps> = ({ label, count }) => {
  return (
    <div className="bg-[#f8f8f8] h-[40] shadow mt-10 p-4 border border-indigo-200 rounded-md">
      <h1 className="text-lg font-bold text-gray-700">{label}</h1>
      <p className="mt-3 font-bold text-md text-orange-500 text-end">{count}</p>
    </div>
  );
};

export default CountCard;
