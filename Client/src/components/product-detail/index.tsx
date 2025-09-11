import { useQuery } from "@tanstack/react-query";
import React from "react";
import DescriptionSection from "./description-section";
import ProductImageSlider from "./image-carousel";
import ComponentTitle from "../landing/component-title-with-button";
import RecomendedSection from "./recommended-products";
import { getProductById } from "../../api/product.api";

interface IProps {
  id: string;
}

const ProductDetail: React.FC<IProps> = ({ id }) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["get_product_by_id", id],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className="mt-3">
      <ComponentTitle
        title={data?.data?.name}
        subTitle={data?.data?.description}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="lg:h-[550px]">
          <ProductImageSlider
            name={data?.data?.name}
            images={data?.data?.images}
          />
        </div>
        {/* desc section */}
        <div className="">
          <DescriptionSection product={data?.data} />
        </div>
      </div>

      {/* recomended */}

      <RecomendedSection />
    </div>
  );
};

export default ProductDetail;
