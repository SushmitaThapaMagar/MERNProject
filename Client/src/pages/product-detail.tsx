import { useParams } from "react-router";
import ProductDetail from "../components/product-detail";

const ProductDetailPage = () => {
  const { id } = useParams();
  // console.log('Product id',id)
  return (
    <main className="px-2 lg:px-36">
      {/* detail components */}
      <ProductDetail id={id ?? ""} />
    </main>
  );
};

export default ProductDetailPage;
