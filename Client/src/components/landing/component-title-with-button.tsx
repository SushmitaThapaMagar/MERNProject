import type { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

type IProps = {
  link?: string;
  title: string;
  subTitle: string;
};

const ComponentTitle: FC<IProps> = ({ title, subTitle, link }) => {
  return (
    <div>
      <div className="flex justify-between mb-9 gap">
        <div>
          <h1 className="text-4xl font-bold text-orange-400">{title}</h1>
          <p className="text-gray-600 text-[-14px] mt-2 line-clamp-1 max-w-[500px]">
            {subTitle}
          </p>
        </div>
        {link && (
          <div>
            <Link className="flex items-center gap-1" to={link}>
              <p className="text-gray-600 text-[13px]">Explore All</p>
              <FaChevronRight
                size={10}
                className="text-gray-600 text-[13px] mb-0.1"
              />
            </Link>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default ComponentTitle;
