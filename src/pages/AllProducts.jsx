import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Loader, DisplayAllProducts, Form, Filters } from "../components";
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/ProductsProvider";
import useFetchProducts from "../customHooks/useFetchProducts";

const AllProducts = () => {
  const [key, setKey] = useState(0);
  const { user, handleUser } = useProductsContext();
  const accessToken = localStorage.getItem("accessToken");
  const { isFetching, data, isLoading, isError, error } =
    useFetchProducts(accessToken);

  useEffect(() => {
    if (data) {
      handleUser(data.user); // Assuming data.user contains the user object
      // No need for a separate state, use data directly or transform it here if necessary
      setKey((prev) => prev++);
    }
  }, [data]);

  if (isLoading || isFetching) return <Loader />;
  if (isError) return <h1>{error?.response?.data?.msg}</h1>;

  if (!data) {
    return <h1>Waiting...</h1>;
  }

  return (
    <div className="products">
      <div className="products-sub-container">
        <h1>All Products</h1>
        <div className="plus-icon-container">
          <button>
            {user?.userRole === "admin" && (
              <Link to="/createProduct" className=" btn create-btn">
                <span>Add new Product</span>
                <FaPlus className="plus-icon" />
              </Link>
            )}
          </button>
        </div>
        <Form />
        <Filters />
        <DisplayAllProducts key={key} products={data.products} />
      </div>
    </div>
  );
};

export default AllProducts;
