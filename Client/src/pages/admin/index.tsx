import CountCard from "../../components/admin/dashboard/card";
import PageTitle from "../../components/admin/page-title";

const Dashboard = () => {
  return (
    <main>
      <PageTitle title="DashBoard" />
      <div className="grid grid-cols-4 gap-4">
        <CountCard label="Total Products" count={20} />
        <CountCard label="Total Categories" count={10} />
        <CountCard label="Total Brands" count={10} />
        <CountCard label="Total Users" count={100} />
        <CountCard label="Total Admins" count={2} />
        <CountCard label="Total Orders" count={2} />
      </div>
    </main>
  );
};

export default Dashboard;
