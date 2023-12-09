import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {REACT_APP_BASE_URL} from "../customHooks/helper.js";
import {FaPlus} from "react-icons/fa";

const Report = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [historyProducts, setHistoryProducts] = useState(null);
    const accessToken = localStorage.getItem("accessToken");
    const btnClass = "btn create-btn get_history";
    const getHistory =async () => {
        await axios.get(`${REACT_APP_BASE_URL}/api/v1/history`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        }).then((response)=>{
            console.log(response);
            setHistoryProducts(response.data.history);
        }).catch((err)=>{
            console.log("ERROR : " + err);
        });
    };
    const onSetDateClicked = (e) => {
        setStartDate(e.target.value);
    }
    const onEndDateClicked = (e) => {
        setEndDate(e.target.value);
    }
    console.log(historyProducts);
    return (
        <div className="wrapper">
            <Link to="/" className="m-y">
                <span>Go back</span>
            </Link>
            <div className="sku-container m-t">
                <label htmlFor="start">Start Date</label>
                <input type="date" className="start" id="start" onChange={onSetDateClicked}/>
                <label htmlFor="end">End Date</label>
                <input type="date" className="end" id="end" onChange={onEndDateClicked}/>
            </div>
            <div className="btn-div" >
                <button disabled={!startDate && !endDate} className={startDate && endDate && btnClass} onClick={getHistory}>Get Report</button>
            </div>
            <table>
                <tbody>
                    {historyProducts && historyProducts.filter((hist)=>{
                        const histArray = hist?.soldDate.split("/");
                        const startArray = startDate.split("-");
                        const endArray = endDate.split("-");
                        return (parseInt(histArray[0]) >= parseInt(startArray[1]) && parseInt(histArray[1]) >= parseInt(startArray[2]) && parseInt(histArray[2]) >= parseInt(startArray[0]))
                            &&
                            (parseInt(histArray[0]) <= parseInt(endArray[1]) && parseInt(histArray[1]) <= parseInt(endArray[2]) && parseInt(histArray[2]) <= parseInt(endArray[0]))
                    }).map((hist) => {
                        console.log("INSIDE MAP : " + hist);
                        return(
                            <tr key={hist?._id} className="product">
                                <td>{hist?.soldDate}</td>
                                <td>{hist?.product?.name}</td>
                                <td>{hist?.soldQuantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>


    );
};

export default Report;
