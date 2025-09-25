import axios from './axios';
import { respChanges } from './responseModify';
import { env } from './envConfig';
const backendHost = env.apiHost

export const getMethod = async (data) => {
    try {

        var headers = {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }

        let respData = await axios({
            'method': 'get',
            'url': backendHost + data.apiUrl,
            data: data.payload ? data.payload : {},
            headers: headers

        });
        return respChanges(respData.data);
    }
    catch (err) {
        return {
            status: 'error',
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const postMethod = async (data) => {
    try {
        var headers = {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }

        let respData = await axios({
            'method': 'post',
            'url': backendHost + data.apiUrl,
            data: data.payload ? data.payload : {},
            headers: headers

        });

        return respChanges(respData.data);
    }
    catch (err) {
        return {
            status: 'error',
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const putMethod = async (data) => {
    try {
        var headers = {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }

        let respData = await axios({
            'method': 'put',
            'url': backendHost + data.apiUrl,
            data: data.payload ? data.payload : {},
            headers: headers

        });

        return respChanges(respData.data);
    }
    catch (err) {
        return {
            status: 'error',
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const deleteMethod = async (data) => {
    try {
        var headers = {
            "content-type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }

        let respData = await axios({
            'method': 'delete',
            'url': backendHost + data.apiUrl,
            data: data.payload ? data.payload : {},
            headers: headers

        });

        return respChanges(respData.data);
    }
    catch (err) {
        return {
            status: 'error',
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}


