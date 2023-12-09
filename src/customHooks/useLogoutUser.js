import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {REACT_APP_BASE_URL} from "./helper.js";

const logoutUser = async () => {
  return await axios.get(
    `${REACT_APP_BASE_URL}/api/v1/auth/logout`,
    {
      withCredentials: true,
    }
  );
};

const useLogoutUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      toast.success("User logged out successfully!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/login");
    },
  });
};

export default useLogoutUser;
