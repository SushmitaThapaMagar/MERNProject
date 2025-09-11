import PageTitle from "../../../components/admin/page-title";
import ProductForm from "../../../components/admin/product/product.form";

const CreateProduct = () => {
  return (
    <main className="h-full w-full">
      <PageTitle
        title="Add New Product"
        link="/admin/products"
        button_label="Back"
      />
      <div>
        <ProductForm />
      </div>
    </main>
  );
};

export default CreateProduct;
