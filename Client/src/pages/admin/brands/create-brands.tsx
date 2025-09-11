import BrandForm from "../../../components/admin/brand/brand.form";
import PageTitle from "../../../components/admin/page-title";

const CreateBrand = () => {
  return (
    <div>
      <PageTitle
        title="Add New Brand"
        link="/admin/brand"
        button_label="Back"
      />
      {/* brand form */}
      <BrandForm />
    </div>
  );
};

export default CreateBrand;
