import PageTitle from "../../../components/admin/page-title";

const CreateUser = () => {
  return (
    <main className="h-full w-full">
      <PageTitle title="Add New User" link="/admin/user" button_label="Back" />
      {/* product form */}
      <div className="bg-[#f8f8f8] h-full py-10 mt-10"></div>
    </main>
  );
};

export default CreateUser;
