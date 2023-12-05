import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductsContext } from "../context/ProductsProvider";
const loginUser = async (user) => {
  const { data } = await axios.post(
    "https://inventory-manager-fglv.onrender.com/api/v1/auth/login",
    user,
    {
      withCredentials: true,
    }
  );
  return data;
};

const useLoginUser = () => {
  const { handleUser } = useProductsContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const userData = {
        userID: data.user._id,
        userName: data.user.name,
        userRole: data.user.role,
      };
      handleUser(userData);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("User Logged in successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    },
  });
};

export default useLoginUser;
