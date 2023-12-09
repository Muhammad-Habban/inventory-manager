import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {REACT_APP_BASE_URL} from "./helper.js";


const fetchProducts = async (accessToken) => {
  const { data } = await axios.get(
    `${REACT_APP_BASE_URL}/api/v1/products`,
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
