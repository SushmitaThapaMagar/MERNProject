import NavLinks from "./nav-links";
import { GrFavorite } from "react-icons/gr";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth.hooks";
import toast from "react-hot-toast";
import type { IUser } from "../../types/user.types";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import { Role } from "../../types/enums";

const NavBar = () => {
  const { token, isLoading, user, setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      setToken(null);
      setUser(null);
      navigate("/login", { replace: true });
      toast.success(response.message || "logout successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const logoutUser = () => {
    mutate();
  };

  if (isLoading) {
    <div className="h-full w-full flex justify-center items-center">
      <p>Loading...</p>
    </div>;
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between tracking-wider px-8 py-2 bg-white shadow-md z-10">
      {/* logoa */}
      <div className="flex items-center">
        <img
          src={"./logo.png"}
          alt="logo image"
          className=" object-cover h-18"
        />
      </div>
      {/* nav links */}
      <div className="flex items-center">
        <NavLinks />
      </div>

      <div className="flex items-center">
        {token ? (
          <LoggedInUsersection logout={logoutUser} user={user} />
        ) : (
          <div>
            <Link
              className="bg-orange-600 rounded-md font-bold text-white px-5 py-2 hover:bg-orange-700 transition-colors flex items-center justify-center"
              to={"/login"}
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export const LoggedInUsersection = ({
  user,
  logout,
}: {
  user: IUser | null;
  logout: () => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      {/* wishlist */}
      {user?.role !== Role.ADMIN && (
        <div className="flex gap-4 items-center">
          <Link
            to={"/wish_list"}
            className="cursor-pointer w-fit bg-[#F8F8F8] p-3 rounded-full flex items-center justify-center"
          >
            <GrFavorite size={26} className="text-indigo-600" />
          </Link>
          {/* cart */}

          <Link
            to={"/cart"}
            className="cursor-pointer w-fit bg-[#F8F8F8] p-2 rounded-full flex items-center justify-center"
          >
            <LiaCartPlusSolid size={30} className="mb-1 text-indigo-600" />
          </Link>
        </div>
      )}

      {/*  */}
      <div>
        <p className="font-semibold italic text-lg capitalize">
          {user?.first_name} {user?.last_name}
        </p>
        <p onClick={logout} className="text-indigo-900 cursor-pointer">
          Logout{" "}
        </p>
      </div>
    </div>
  );
};

export default NavBar;
