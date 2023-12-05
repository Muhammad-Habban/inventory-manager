import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async (accessToken) => {
  const { data } = await axios.get(
    `https://inventory-manager-fglv.onrender.com/api/v1/products`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );

  return data;
};

const useFetchProducts = (accessToken) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return fetchProducts(accessToken);
    },
  });
};

export default useFetchProducts;
