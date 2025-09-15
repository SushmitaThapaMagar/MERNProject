import { useQuery } from "@tanstack/react-query";
import ProductCard from "../products/card";
import ComponentTitle from "./component-title-with-button";
import { getFeaturedProducts } from "../../api/product.api";
import ProductCardLoader from "../loaders/product-loader";
import NotFoundComponent from "../common/not-found-card/not-found";
import type { IProductData } from "../../types/product.types";

const FeaturedProduct = () => {
  const { data, isLoading } = useQuery({
    queryFn: getFeaturedProducts,
    queryKey: ["get_featured_products"],
  });
  // console.log(data, isLoading);

  //1. isLoading -> render loading component
  //2. if data.length ==== 0 -> render data not found
  //3.if all ok => render data (products card)

  return (
    <div className="mt-16 px-15 lg:px-36">
      <ComponentTitle
        title="Featured Products"
        subTitle="Our featured products"
        key={"featured_component_title"}
        link="/product"
      />
      <div className="flex flex-wrap gap-6">
        <div className="w-full">
          {data && data.data.length === 0 && (
            <NotFoundComponent message="Products Not Found!" />
          )}
        </div>

        {/* [1,2,3,4,5,6,7....9] */}

        {isLoading
          ? Array.from({ length: 12 }, (_, i) => i + 1).map((index) => (
              <ProductCardLoader key={index} />
            ))
          : data.data.map((product: IProductData) => (
              <ProductCard product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
