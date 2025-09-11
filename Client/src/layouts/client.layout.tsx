import { Outlet } from "react-router";
import Footer from "../components/footer/footer";
import NavBar from "../components/header";

const ClientLayout = () => {
  return (
    <main>
      {/* nav section */}
      <div>
        <NavBar />
      </div>

      {/* dynamic section */}
      <div>
        <Outlet />
      </div>
      {/* footer section */}
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default ClientLayout;
