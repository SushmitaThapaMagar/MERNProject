import Hero from "../components/landing/hero";
import FeaturedProduct from "../components/landing/featured-Products";
import SummerSale from "../components/landing/summer-sale";
import MostSale from "../components/landing/most_sale";
import CategoryList from "../components/landing/category/category-list-components";

//should start from capital letter
const HomePage = () => {
  return (
    <div>
      <Hero />
      <CategoryList />
      <FeaturedProduct />
      <MostSale />
      <SummerSale />
    </div>
  );
};

export default HomePage;
