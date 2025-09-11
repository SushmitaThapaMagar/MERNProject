import { LuLayoutDashboard } from "react-icons/lu";
import { SlTag } from "react-icons/sl";
import { Link } from "react-router";
import { TbBrandCtemplar } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaFirstOrder } from "react-icons/fa";

const sidebarLinks = [
  {
    label: "Dashboard",
    link: "/admin",
    icon: <LuLayoutDashboard size={24} />,
  },
  {
    label: "Category",
    link: "/admin/category",
    icon: <SlTag size={24} />,
  },
  {
    label: "Brands",
    link: "/admin/brand",
    icon: <TbBrandCtemplar size={24} />,
  },
  {
    label: "Products",
    link: "/admin/products",
    icon: <MdProductionQuantityLimits size={24} />,
  },
  {
    label: "Users",
    link: "/admin/users",
    icon: <FaUsers size={24} />,
  },
  {
    label: "Orders",
    link: "/admin/orders",
    icon: <FaFirstOrder size={24} />,
  },
];

const SideBar = () => {
  return (
    <aside>
      <div className="flex items-center gap-4 ">
        <div>
          <img
            src={"./logo.png"}
            alt="logo image"
            className="object-cover h-20"
          />
        </div>
        <p className="text-xl font-bold italic text-orange-500">Shop Cart</p>
      </div>
      {/* sidebar navigation */}
      <div className="mt-8 flex flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive = item.link === location.pathname;
          return (
            <Link to={item.link}>
              <div
                className={`flex items-center gap-2 px-5 hover:bg-cyan-600 group ${
                  isActive ? "bg-cyan-700 group text-black" : "text-orange-600"
                }py-2 rounded-sm`}
              >
                <div
                  className={`text-orange-600 group-hover:text-white ${
                    isActive ? "text-white" : "text-orange-500"
                  }`}
                >
                  {item.icon}
                </div>
                <p className="text-lg font-semibold text-cyan-800 group-hover:text-white">
                  {item.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
