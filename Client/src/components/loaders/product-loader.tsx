const ProductCardLoader = () => {
  return (
    <div className="p-3 flex h-fit w-[300px] flex-col items-center gap-2 bg-[#f8f8f8] rounded-md animate-pulse">
      {/* shimmer icon */}
      <div className="w-[100px] h-[100px] bg-gray-300 rounded-md" />

      {/* shimmer text */}
      <div className="w-full h-4 bg-gray-300 rounded mb-1" />
      <div className="w-full h-4 bg-gray-300 rounded mb-1" />

      <div className="flex-1">
        <div className="w-10 h-4 bg-gray-300 rounded mb-1" />
        <div className="w-10 h-3 bg-gray-200 rounded" />
      </div>
      <div className="w-full flex justify-between">
        <div className=" h-15 bg-gray-300 rounded mb-1" />
        <div className=" h-15 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ProductCardLoader;
