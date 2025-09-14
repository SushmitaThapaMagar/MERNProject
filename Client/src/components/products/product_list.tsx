import { getAllProducts } from "../../api/product.api";
import { useQuery } from "@tanstack/react-query";
import ProductCardLoader from "../loaders/product-loader";
import ProductCard from "../products/card";
import type { IProductData } from "../../types/product.types";
import NotFoundComponent from "../common/not-found-card/not-found";

const AllProductList = () => {
  const { isLoading, data } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["get_all_products"],
  });
  console.log(data);
  const arr = Array.from({ length: 12 }, (_, i) => `product-list-${i + 1}`);

  return (
    <div className="mt-6 px-4 lg:px-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="col-span-full">
          {data && data.data.products.length === 0 && (
            <NotFoundComponent message="Products Not Found!" />
          )}
        </div>

        {isLoading
          ? arr.map((val) => <ProductCardLoader key={val} />)
          : data.data.products.map((product: IProductData) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default AllProductList;
