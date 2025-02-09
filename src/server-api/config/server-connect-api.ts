import axios from "axios";

import { getToken } from "../../storage";

const token = getToken();

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const consumer_key = process.env.NEXT_PUBLIC_KEY;
export const consumer_secret = process.env.NEXT_PUBLIC_CONSUMER;  

export const createServerConnectAPI = (authRequired = false) => {
  const headers = {
    Accept: "application/json",
    // 'Authorization': `Bearer ${token}`
    Authorization: token ? `Bearer ${token}` : undefined,
  };
  const requestOptions: any = {
    baseURL: baseUrl,
    headers: headers,
  };
  if (authRequired) {
    requestOptions.auth = {
      username: consumer_key,
      password: consumer_secret,
    };
  }
  const apiClient = axios.create(requestOptions);

  apiClient.interceptors.request.use(requestInterceptor);
  apiClient.interceptors.response.use(responseInterceptor);

  return apiClient;
};

const requestInterceptor = (config: any) => {
  const token = getToken(); 
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"]; 
  }
  return config;
};

const responseInterceptor = (response: any) => {
  if (response.data.status === 400) {
    throw new Error('Bad Request');
  }
  return response;
};

// const serverConnectAPI = axios.create({
//     baseURL: baseURL,
//     headers: {
//         Accept: "application/json", // Set a default Accept header to JSON responses
//     },
//     auth: {
//         username: consumerKey,
//         password: consumerSecret,
//     },
// });

// serverConnectAPI.interceptors.request.use(async function (config) {
//     const authToken = getToken();

//     // const uuid = await getData('luxmetallic_uuid');
//     config.headers["Authorization"] = authToken ? `Bearer ${authToken}` : undefined;

//     // config.headers["User-Token"] = uuid;
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// Adding an interceptor for the response to handle WooCommerce API responses effectively
// serverConnectAPI.interceptors.response.use(function (response) {
//     if (response.status === 200) {
//         if (response.data) {
//             if (response.data.status === false) {
//                 if (response.data.validation) throw response.data.validation;
//                 if (response.data.message) throw response.data.message;
//             }
//             return response.data;
//         }
//         return response;
//     }
//     else if (response.status === 201 && response?.data?.reLogin) {
//         authStorage.deleteUser();
//         window.location.replace(routes.login);
//     } else if (response.status === 403) {
//         alert("You do not have permission to perform this action!");
//     } else if (response.status === 204) {
//         throw "No content found";
//     } else {
//         throw "Unknown database error (code:2)";
//     }
// }, function (error) {
//     if (error && error.response) {
//         const { data, status } = error.response;
//         if (status === 401) {
//             return Promise.reject(data?.errorMsg || data?.message || "Validation error (status 401)");
//         } else if (status === 500) {
//             return Promise.reject(data?.message || "Internal server error");
//         }
//         return Promise.reject(error.message || "Unknown error occurred");
//     }
//     return Promise.reject(error.message || "Network error");
// });

// export default serverConnectAPI;
