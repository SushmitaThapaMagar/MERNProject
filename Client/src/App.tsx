import "./App.css";
import HomePage from "./pages/home";
import Login from "./pages/login";
import PageNotFound from "./pages/page-not-found";
import ProductDetail from "./pages/product-detail";
import Register from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <>
      {/*Wrapper component: <Router><Routes> === we use button, back button or smth like that we use this to take path*/}
      <Router>
        <Routes>
          {/*Defining page routes*/}
          <Route path="/" element={<HomePage />} />
          {/*route with parameter to make the recurring clear*/}
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
