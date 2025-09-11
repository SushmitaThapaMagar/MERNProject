import heroImage from "../../assets/cart.jpg";

const Hero = () => {
  return (
    <div id={"hero-section"} className="w-full h-[80vh] relative">
      {/* overlay */}
      <div className="bg-black/40 absolute inset-0"></div>

      <img src={heroImage} className="h-full w-full" />

      <div className="absolute top-1/3 left-20 max-w-[600px]">
        <div>
          <h1 className="text-5xl text-orange-400 font-extrabold">
            Your One-Stop Online Destination
          </h1>
          <p className="text-lg text-[#FCF7F8] mt-5">
            A digital platform where consumers can purchase goods and services
            over the internet. These stores operate on e-commerce websites,
            allowing businesses to reach customers worldwide without the
            limitations of a physical storefront.
          </p>
        </div>
        <br />
        <button className="bg-orange-400 border border-[white] text-[#FCF7F8] hover:bg-amber-400 hover:border-[orange] hover:text-white transition-all py-2 w-[130px] rounded-md font-semibold text-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
};
export default Hero;
