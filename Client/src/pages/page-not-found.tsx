import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <main className="flex h-full justify-center items-center">
      <div>
        <h1 className="text-4xl font-extrabold text-[#A31621] text-center mb-4">
          OPPS!
        </h1>
        <h2 className="text-2xl text-gray-600 text-center">Page Not Found</h2>
        <p className="text-gray-600 mt-5 text-center ">
          The page you are trying to find is not working!
        </p>
        <Link to={"/"}>
          <button className="bg-[#A31621] w-full p-2 rounded-md text-white text-[16px] font-[500] cursor-pointer ">
            Go to Home
          </button>
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
