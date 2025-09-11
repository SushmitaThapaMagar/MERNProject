/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/auth.hooks";
import type { Role } from "../../types/enums";
import toast from "react-hot-toast";

export const withAuth = (WrappedComponent: any, roles: Role[]) => {
  return function ProtectedRoute(props: any) {
    const navigate = useNavigate();
    const location = useLocation();

    const { isLoading, token, user } = useAuth();

    if (!isLoading && (!token || !user)) {
      navigate("/login", { replace: true, state: { from: location } });
      toast.error("Unauthorized access denied");
      return null;
    }

    if (!isLoading && user && roles.length > 0 && !roles.includes(user?.role)) {
      navigate("/login", { replace: true });
      toast.error("You cannot access this resource");
      return null;
    }

    if (isLoading) return <div>Loading</div>;

    return <WrappedComponent {...props} />;
  };
};
