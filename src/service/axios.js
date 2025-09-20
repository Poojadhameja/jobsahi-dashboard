// import packages
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const setAuthorization = (token) => {
    axios.defaults.headers.common["Authorization"] = token;
};

export const removeAuthorization = () => {
    delete axios.defaults.headers.common["Authorization"];
};
export const removeAuthToken = () => {
    localStorage.removeItem("authToken");

    localStorage.clear();
    window.location.reload();
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();
    window.location.href = "/login";
};

export const checkAuth = () => {
    let getToken = localStorage.getItem("authToken");
    if (getToken != "" && getToken != undefined && getToken != null) {
        return true;
    } else {
        return false;
    }
};

export const logout = () => {
    localStorage.clear();
};

export const handleResp = (respData, type = "success") => {
    try {
            if (type == "success" && respData && respData.data) {
            return respData.data;
            } else if (
                type == "error" &&
                respData &&
                respData.response &&
                respData.response.data
            ) {
                return respData.response.data;
            } else {
                return {
                status: "FAILED",
                message: "Something went wrong",
                };
            }
        } catch (err) {
            return {
            status: "FAILED",
            message: "Something went wrong",
            };
        }
};

export default axios;
