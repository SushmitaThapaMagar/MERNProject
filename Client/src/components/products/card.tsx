import { useMutation } from "@tanstack/react-query";
import productImage from "../../assets/car.jpg";
import type { IProductData } from "../../types/product.types";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { addtoWishList } from "../../api/wishlist.api";

// define props type
type IProps = {
  product: IProductData;
};

const ProductCard = ({ product }: IProps) => {
  // console.log(product)

  // * mutation for add to wishlist
  const { mutate, isPending } = useMutation({
    mutationFn: addtoWishList,
    mutationKey: ["add_to_wishlist"],
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const handleClick = () => {
    if (product) {
      mutate(product._id);
    } else {
      toast.error("This is dummy product. Can not added to wishlist");
    }
  };
  return (
    <div className="w-full sm:max-w-[280px] flex flex-col p-4 py-6 bg-[#f8f8f8] rounded-md shadow-md transition-transform duration-300 hover:scale-105">
      {/* image */}
      <div className="max-h-[180px] w-[180px] mx-auto cursor-pointer">
        <img
          // cover_image
          src={product?.coverImage?.path ?? productImage}
          alt="Product Image"
          className="h-full w-full object-contain hover:scale-110 transition-all duration-300 hover:grayscale-40"
        />
      </div>

      <div className="mt-4">
        {/* product.name */}
        <h1 className="text-[#A31621] font-bold text-[16px] line-clamp-1">
          {product?.name ?? "Vintage Car 16 Gen 7(16,AMD)"}
        </h1>
        {/* product.description */}
        <p className="text-[14px] mt-1 line-clamp-2 text-gray-700">
          {product?.description ??
            `16" WUXGA | AXex 7000 | 16GB RAM
                    | 512GB SSD | Radeon Graphics
                    Intel Xeon E-2336 | 32GB RAM | 1TB NVMe SSD | Remote Management`}
        </p>
      </div>
      <div className="flex mt-3 justify-between text-lg">
        {/* price */}
        <p className="font-bold text-[14px]">
          {new Intl.NumberFormat("en-NP", {
            style: "currency",
            currency: "NPR",
          }).format(product?.price ?? 12000000)}
        </p>
        {/* stock */}
        <p className="font-bold text-[14px]">
          stock:{" "}
          <span
            className={`${
              product?.stock > 5 ? "text-green-600" : "text-red-500"
            }  text-[14px]`}
          >
            {product?.stock ?? 10}
          </span>
        </p>
      </div>
      <div className=" flex justify-between mt-4 gap-3">
        <Link
          className="w-full"
          to={`/product/${product?._id ?? "1"}?name=${product?.name}`}
        >
          <button className=" bg-[#A31621] w-full p-2 rounded-md text-white text-[16px] font-[500] cursor-pointer">
            View Detail
          </button>
        </Link>
        <button
          disabled={isPending}
          onClick={handleClick}
          className=" disabled:cursor-not-allowed border border-[#A31621]  w-full px-1  rounded-md text-[#A31621] text-[16px] font-[500] cursor-pointer hover:bg-[#f5d0d2] transition duration-200 "
        >
          {isPending ? "Adding to list.." : "Add to wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
