import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {REACT_APP_BASE_URL} from "./helper.js";
const fetchSingleProduct = async ({ productID, accessToken }) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_BASE_URL}/api/v1/products/${productID}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const useFetchSingleProduct = ({ productID, accessToken }) => {
  return useQuery({
    queryKey: ["products", productID],
    queryFn: () => fetchSingleProduct({ productID, accessToken }),
  });
};

export default useFetchSingleProduct;
