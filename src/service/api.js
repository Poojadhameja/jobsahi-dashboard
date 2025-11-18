import axios from './axios';
import { respChanges } from './responseModify';
import { env } from './envConfig';

export const SERVICE_URL = env.apiHost;  // ✅ expose same base URL for direct use if needed
const backendHost = SERVICE_URL;

/**
 * 🟢 Common header generator
 */
const getHeaders = (includeAuth = true) => {
  const headers = { "content-type": "application/json" };
  const token = localStorage.getItem("authToken");
  if (includeAuth && token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

/**
 * 🟢 GET method
 */
export const getMethod = async (data) => {
  try {
    const headers = getHeaders();
    const token = localStorage.getItem("authToken");

    console.log('🌐 GET Request:', {
      url: backendHost + data.apiUrl,
      token: token ? `${token.substring(0, 15)}...` : 'No token'
    });

    const respData = await axios({
      method: 'get',
      url: backendHost + data.apiUrl,
      params: data.params || {}, // ✅ use params for GET
      headers
    });

    console.log('✅ GET Response:', respData.data);
    return respChanges(respData.data);
  } catch (err) {
    console.error('❌ GET Error:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
      url: backendHost + data.apiUrl
    });
    return {
      status: false,
      message: err.response?.data?.message || err.message || 'Network error occurred',
      data: []
    };
  }
};

/**
 * 🟢 POST method
 */
export const postMethod = async (data) => {
  try {
    // const headers = getHeaders(!data.apiUrl.includes('signup') && !data.apiUrl.includes('create_user'));
    const headers = getHeaders(
  data?.apiUrl && !data.apiUrl.includes('signup') && !data.apiUrl.includes('create_user')
);


    console.log('🌐 POST Request:', {
      url: backendHost + data.apiUrl,
      payload: data.payload,
      token: headers.Authorization ? `${headers.Authorization.substring(0, 20)}...` : 'No token'
    });

    const respData = await axios({
      method: 'post',
      url: backendHost + data.apiUrl,
      data: data.payload || {},
      headers
    });

    const response = respChanges(respData.data);
    response.httpStatus = respData.status;
    console.log('✅ POST Response:', response);
    return response;
  } catch (err) {
    console.error('❌ POST Error:', err.response?.data || err);
    return {
      status: false,
      message: err.response?.data?.message || 'Something went wrong while posting data.',
      data: []
    };
  }
};

/**
 * 🟢 PUT method
 */
export const putMethod = async (data) => {
  try {
    const headers = getHeaders();
    console.log('🌐 PUT Request:', {
      url: backendHost + data.apiUrl,
      payload: data.payload || data.data
    });

    const respData = await axios({
      method: 'put',
      url: backendHost + data.apiUrl,
      data: data.payload || data.data || {},
      headers
    });

    console.log('✅ PUT Response:', respData.data);
    return respChanges(respData.data);
  } catch (err) {
    console.error('❌ PUT Error:', err.response?.data || err);
    return {
      status: false,
      message: err.response?.data?.message || 'Update failed',
      data: []
    };
  }
};

/**
 * 🟢 PUT MULTIPART method (for file uploads with PUT requests)
 */
export const putMultipart = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    console.log("🌐 PUT Multipart Request:", {
      url: backendHost + data.apiUrl,
      data: data.data instanceof FormData ? "[FormData]" : data.data,
      token: token ? `${token.substring(0, 15)}...` : "No token",
    });

    const respData = await axios({
      method: "put",
      url: backendHost + data.apiUrl,
      data: data.data, // ✅ This must be FormData
      headers,
    });

    const response = respChanges(respData.data);
    response.httpStatus = respData.status;
    console.log("✅ PUT Multipart Response:", response);
    return response;
  } catch (err) {
    console.error("❌ PUT Multipart Error:", {
      message: err.message,
      response: err.response?.data,
      url: backendHost + data.apiUrl,
    });

    return {
      status: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Something went wrong during file upload.",
      data: [],
    };
  }
};

/**
 * 🟢 DELETE method
 */
export const deleteMethod = async (data) => {
  try {
    const headers = getHeaders();
    console.log('🌐 DELETE Request:', {
      url: backendHost + data.apiUrl,
      payload: data.payload
    });

    const respData = await axios({
      method: 'delete',
      url: backendHost + data.apiUrl,
      data: data.payload || {},
      headers
    });

    console.log('✅ DELETE Response:', respData.data);
    return respChanges(respData.data);
  } catch (err) {
    console.error('❌ DELETE Error:', err.response?.data || err);
    return {
      status: false,
      message: err.response?.data?.message || 'Delete failed',
      data: []
    };
  }
};

/**
 * 🟢 POST MULTIPART method (for file uploads like logo, resume, etc.)
 */
export const postMultipart = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    console.log("🌐 POST Multipart Request:", {
      url: backendHost + data.apiUrl,
      data: data.data instanceof FormData ? "[FormData]" : data.data,
      token: token ? `${token.substring(0, 15)}...` : "No token",
    });

    const respData = await axios({
      method: "post",
      url: backendHost + data.apiUrl,
      data: data.data, // ✅ This must be FormData
      headers,
    });

    const response = respChanges(respData.data);
    response.httpStatus = respData.status;
    console.log("✅ POST Multipart Response:", response);
    return response;
  } catch (err) {
    console.error("❌ POST Multipart Error:", {
      message: err.message,
      response: err.response?.data,
      url: backendHost + data.apiUrl,
    });

    return {
      status: false,
      message:
        err.response?.data?.message ||
        err.message ||
        "Something went wrong during file upload.",
      data: [],
    };
  }
};


// export const postMultipart = async (data) => {
//   try {
//     const token = localStorage.getItem("authToken");
//     const headers = {
//       Authorization: token ? `Bearer ${token}` : "",
//       "Content-Type": "multipart/form-data",
//     };

//     console.log("🌐 POST (Multipart) Request:", {
//       url: backendHost + data.apiUrl,
//       formDataKeys: data.formData ? Array.from(data.formData.keys()) : [],
//     });

//     const respData = await axios({
//       method: "post",
//       url: backendHost + data.apiUrl,
//       data: data.formData, // must be FormData object
//       headers,
//     });

//     console.log("✅ POST (Multipart) Response:", respData.data);
//     return respChanges(respData.data);
//   } catch (err) {
//     console.error("❌ POST (Multipart) Error:", err.response?.data || err);
//     return {
//       status: false,
//       message:
//         err.response?.data?.message || "Something went wrong while uploading file.",
//       data: [],
//     };
//   }
// };
