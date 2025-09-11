import { Outlet } from "react-router";
import { Role } from "../types/enums";
import { withAuth } from "../components/hoc/with-auth.hoc";
import AdminHeader from "../components/header/admin";
import SideBar from "../components/admin/side-bar";

const AdminLayout = () => {
  return (
    <main className="w-full h-full flex">
      {/* sidebar */}
      <div className="h-full w-[300px] border-r border-orange-200 shadow py-6 px-1">
        <SideBar />
      </div>

      <div className="h-full w-full">
        {/* navbar */}
        <div className="w-full shadow">
          <AdminHeader />
        </div>
        {/* [page content */}
        <div className="p-6">
          {" "}
          <Outlet />
        </div>
      </div>
    </main>
  );
};
const AdminPanel = withAuth(AdminLayout, [Role.ADMIN]);

export default AdminPanel;
