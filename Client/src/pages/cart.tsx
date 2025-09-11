import { withAuth } from "../components/hoc/with-auth.hoc";
import ComponentTitle from "../components/landing/component-title-with-button";
import { Role } from "../types/enums";

const CartPage = () => {
  return (
    <main className="px-36 mt-5">
      <ComponentTitle
        title={"Your Dream List (cart)"}
        subTitle={"Easily find and shop the products you have saved"}
      />
      {/* CartPage products */}
      <div></div>
    </main>
  );
};

const Component = withAuth(CartPage, [Role.USER]);

export default Component;
