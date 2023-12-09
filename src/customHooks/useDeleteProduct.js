import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {REACT_APP_BASE_URL} from "./helper.js";

const deleteProduct = async ({productID, accessToken}) => {
  return await axios.delete(
    `${REACT_APP_BASE_URL}/api/v1/products/${productID}`,
    {
      headers: {
        "authorization" : `Bearer ${accessToken}`,
      },
      withCredentials: true
    }
  );
};

const useDeleteProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
  });
};

export default useDeleteProduct;
