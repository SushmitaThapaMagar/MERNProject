import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../../api/product.api";
import NotFoundComponent from "../common/not-found-card/not-found";
import type { IProductData } from "../../types/product.types";
import ProductCardLoader from "../loaders/product-loader";
import ProductCard from "../products/card";
import ComponentTitle from "../landing/component-title-with-button";

const RecomendedSection = () => {
  const { data, isLoading } = useQuery({
    queryFn: getFeaturedProducts,
    queryKey: ["get_related_products"],
  });
  return (
    <div className="mt-40 mb-10">
      <ComponentTitle
        title="Related Products"
        subTitle="Products you may also like"
        key={"related_component_title"}
        //   link='/products'
      />
      <div className="mt-4 flex flex-wrap gap-6 px-4 sm:px-0">
        <div className="w-full">
          {data && data.data.length === 0 && (
            <NotFoundComponent message="Products Not Found" />
          )}
        </div>

        {
          // [1,2,3,4,,,,,,,13]
          isLoading
            ? Array.from({ length: 12 }, (_, i) => i + 1).map((index) => (
                <ProductCardLoader key={index} />
              ))
            : data.data.map((product: IProductData) => {
                return <ProductCard product={product} key={product._id} />;
              })
        }
      </div>
    </div>
  );
};

export default RecomendedSection;
