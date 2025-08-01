import { BrowserRouter, Routes, Route } from "react-router-dom";
import{ProductList} from "../components/ProductList";
import { AddProductForm } from "../components/AddProductForm";



function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="*" element={<ProductList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;