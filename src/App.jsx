import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SharedLayout,
  Login,
  ProtectedRoutes,
  AllProducts,
  CreateProduct,
  UpdateProduct,
  Error,
  Report
} from "./pages/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<AllProducts />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/report" element={<Report />} />
            <Route
              path="/updateProduct/:productID"
              element={<UpdateProduct />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
