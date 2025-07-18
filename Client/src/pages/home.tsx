import { Link } from "react-router";

//should start from capital letter
const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to={"/product/1"}>
        <span>Product 1</span>
      </Link>
      <Link to={"/product/2"}>
        <span>Product 2</span>
      </Link>
      <Link to={"/product/3"}>
        <span>Product 3</span>
      </Link>
      <Link to={"/product/4"}>
        <span>Product 4</span>
      </Link>
    </div>
  );
};

export default HomePage;
