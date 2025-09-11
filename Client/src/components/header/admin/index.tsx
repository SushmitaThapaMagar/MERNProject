import { useNavigate } from "react-router";
import { LoggedInUsersection } from "..";
import { useAuth } from "../../../hooks/auth.hooks";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../api/auth.api";
import toast from "react-hot-toast";

const AdminHeader = () => {
  const { user, setUser, setToken } = useAuth();
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

  return (
    <nav className="w-full px-4 py-3 flex justify-between items-center">
      <div>
        <p className="font-bold italic text-lg text-orange-600">
          Welcome Back ,{" "}
        </p>
      </div>
      <LoggedInUsersection user={user} logout={logoutUser} />
    </nav>
  );
};

export default AdminHeader;
