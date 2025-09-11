import CategoryList from "../../../components/admin/category/list";
import PageTitle from "../../../components/admin/page-title";

const CategoryListAdmin = () => {
  return (
    <div>
      <PageTitle
        title="Categories"
        link="/admin/add/category"
        button_label="Add Category"
      />
      <CategoryList />
    </div>
  );
};

export default CategoryListAdmin;
