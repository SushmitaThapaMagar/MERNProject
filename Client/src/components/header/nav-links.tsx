import { Link, useLocation } from "react-router-dom"; // Ensure you import useLocation

const navLinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Products",
    link: "/product",
  },
  {
    label: "About",
    link: "/about_us", // Fixed typo in the link
  },
  {
    label: "Contact",
    link: "/contact_us", // Fixed typo in the link
  },
  {
    label: "Donate",
    link: "/contact_us", // Fixed typo in the link
  },
];

const NavLinks = () => {
  const location = useLocation(); // Use useLocation to get current path

  return (
    <div className="flex items-center gap-10">
      {" "}
      {/* Corrected class name */}
      {navLinks.map((item) => (
        <Link to={item.link}>
          {" "}
          {/* Added key for each link */}
          <span
            className={`text-lg font-[400] ${
              location.pathname === item.link
                ? "font-[600] text-orange-600"
                : ""
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
