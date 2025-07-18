import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <main>
      <h1>Page Not Found</h1>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </main>
  );
};

export default PageNotFound;
