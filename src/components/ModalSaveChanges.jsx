/* eslint-disable react/prop-types */
import React from "react";
import useSaveChanges from "../customHooks/useSaveChanges";
import { useProductsContext } from "../context/ProductsProvider";
import axios from "axios";
import {REACT_APP_BASE_URL} from "../customHooks/helper.js";


const ModalSaveChanges = ({ products }) => {
  const { productID, handleHideModal } = useProductsContext();
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const { mutate: saveChanges } = useSaveChanges();

  const productToBeSaved = products.filter(
    (product) => product._id === productID
  );
  const { sku, name, onHold, sold, toCome } = productToBeSaved[0];

  const handleAxiosRequest = async () => {
    const { data } = await axios.post(
        `${REACT_APP_BASE_URL}/api/v1/history`,
        {
          productID,
          soldQuantity: sold,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
    );
    console.log(data);
  }
  const handleSaveChangesMutation = () => {
    const details = { sku, name, onHold, sold:0, toCome };
    saveChanges({ productID, details, accessToken });
    handleHideModal();
  };
  // onClick = () = {
  //   axiosRequest;
  //   handleSaveChangesMutation;
  // }
  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Are you sure you want to save these changes?</h3>
        <div className="btns-container">
          <button className="btn" onClick={()=>{
            handleSaveChangesMutation();
            handleAxiosRequest();
          }} >
            Save Changes
          </button>
          <button className="modal-btn" onClick={handleHideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSaveChanges;
