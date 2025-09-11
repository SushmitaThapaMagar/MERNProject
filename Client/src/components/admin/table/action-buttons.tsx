import React from "react";
import { CiTrash } from "react-icons/ci";
import { LuFolderPen } from "react-icons/lu";
import { Link } from "react-router";

interface IProps {
  onDelete?: () => void;
  edit_link?: string;
}

const ActionButtons: React.FC<IProps> = ({ onDelete, edit_link }) => {
  return (
    <div className="flex gap-3 justify-center items-center">
      <Link to={edit_link ?? "#"}>
        <LuFolderPen
          title="Edit"
          className="text-cyan-600 cursor-pointer"
          size={22}
        />
      </Link>
      <CiTrash
        onClick={onDelete}
        title="Delete"
        size={24}
        className="text-red-500 cursor-pointer"
      />
    </div>
  );
};

export default ActionButtons;
