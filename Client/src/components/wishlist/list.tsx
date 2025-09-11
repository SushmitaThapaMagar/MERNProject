import { useQuery } from "@tanstack/react-query";
import WishListProductCard from "./card";
import { getWishList } from "../../api/wishlist.api";
import type { IProductData } from "../../types/product.types";
import ProductCardLoader from "../loaders/product-loader";

const List = () => {
  // integrate with backend

  //1.api/query function
  const { isLoading, data } = useQuery({
    queryFn: getWishList,
    queryKey: ["get_wishlist"],
  });

  //2.use reactQuery useQuery hook to get data/wishlist

  const arr = Array.from({ length: 9 }, (_, i) => `wishlist-${i + 1}`);
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-2">
        {isLoading
          ? arr.map((data) => <ProductCardLoader key={data} />)
          : data.data.map((product: IProductData) => (
              <WishListProductCard key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default List;
