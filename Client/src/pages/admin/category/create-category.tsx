import PageTitle from "../../../components/admin/page-title";
import CategoryForm from "../../../components/admin/category/category.form";

const CreateCategory = () => {
  return (
    <main>
      <PageTitle
        title="Add new Categories "
        link="/admin/category"
        button_label="Back"
      />
      <div className="bg-[#f8f8f8] h-full">
        <CategoryForm />
      </div>
    </main>
  );
};

export default CreateCategory;
