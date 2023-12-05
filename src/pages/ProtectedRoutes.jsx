import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useProductsContext } from "../context/ProductsProvider.jsx";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutes = () => {
  const { user, handleUser } = useProductsContext();
  let accessToken = "";
  accessToken = localStorage.getItem("accessToken");
  if (!accessToken) accessToken = "";
  let user2 = null;
  try {
    const decodedToken = jwtDecode(accessToken);
    user2 = decodedToken?.userInfo;
  } catch (err) {
    console.log("ERROR : " + err);
  }
  useEffect(() => {
    if (!user) {
      handleUser(user2);
    }
  }, [user]);
  return accessToken !== "" ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
