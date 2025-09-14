import "./APP.css";
import HomePage from "./pages/home";

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Products from "./pages/products";
import AboutUs from "./pages/about";
import ContactUs from "./pages/contact-us";
import PageNotFound from "./pages/page-not-found";
import ClientLayout from "./layouts/client.layout";
import Wishlist from "./pages/wishlist";
import CartPage from "./pages/cart";

import ProductDetailPage from "./pages/product-detail";
import AdminLayout from "./layouts/admin.layout";
import CreateCategory from "./pages/admin/category/create-category";
import CategoryListAdmin from "./pages/admin/category/category";
import CreateProduct from "./pages/admin/product/create-product";
import Productss from "./pages/admin/product/index";
import Brands from "./pages/admin/brands";
import Dashboard from "./pages/admin";
import Orders from "./pages/admin/orders";
import CreateOrder from "./pages/admin/orders/create-order";
import CreateBrand from "./pages/admin/brands/create-brands";
import Users from "./pages/admin/users";

function APP() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* client */}
          {/* defining page routes*/}
          <Route path="/" element={<ClientLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<Products />} />

            {/* dynamic   */}
            <Route path="/product:id" element={<ProductDetailPage />} />

            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/wish_list" element={<Wishlist />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            {/* category */}
            <Route path="/admin/category" element={<CategoryListAdmin />} />
            <Route path="/admin/add/category" element={<CreateCategory />} />
            {/* brands */}
            <Route path="/admin/brand" element={<Brands />} />
            <Route path="/admin/add/brand" element={<CreateBrand />} />

            {/* products */}
            <Route path="/admin/products" element={<Productss />} />
            <Route path="/admin/add/product" element={<CreateProduct />} />
            {/*users*/}
            <Route path="/admin/users" element={<Users />} />

            {/* orders */}
            <Route path="/admin/orders" element={<Orders />} />

            <Route path="/admin/add/orders" element={<CreateOrder />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default APP;
