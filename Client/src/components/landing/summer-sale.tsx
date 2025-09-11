import { useQuery } from "@tanstack/react-query";
import ProductCard from "../products/card";
import ComponentTitle from "./component-title-with-button";
import { getFeaturedProducts } from "../../api/product.api";
import NotFoundComponent from "../common/not-found-card/not-found";
import ProductCardLoader from "../loaders/product-loader";
import type { IProductData } from "../../types/product.types";

const SummerSale = () => {
  const { data, isLoading } = useQuery({
    queryFn: getFeaturedProducts,
    queryKey: ["get_mostsales_products"],
  });
  return (
    <div className="mt-16 px-4 lg:px-36">
      <ComponentTitle
        title="2 weeks most sale"
        subTitle="2 weeks most sale products"
        key={"most_sale_component_title"}
        link="#"
      />
      <div className="mt-4 flex flex-wrap gap-6">
        <div className="w-full">
          {data && data.data.length === 0 && (
            <NotFoundComponent message="Products Not Found!" />
          )}
        </div>

        {/* [1,2,3,4,5,6,7....9] */}

        {isLoading
          ? Array.from({ length: 9 }, (_, i) => i + 1).map((index) => (
              <ProductCardLoader key={index} />
            ))
          : data?.data.map((product: IProductData) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default SummerSale;
