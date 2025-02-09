import axios from "axios";

import  { getToken } from "../../storage";
import { baseURL } from "./base-urls";

const connectAPI = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json", // Set a default Accept header to JSON responses
    },

});

connectAPI.interceptors.request.use(async function (config) {
    const authToken = getToken();
    config.headers["Authorization"] = authToken ? `Bearer ${authToken}` : undefined;
    return config;
}, function (error) {
    return Promise.reject(error);
});

// connectAPI.interceptors.response.use(function (response) {
//     const nonce = response.headers['Nonce'];  
//     if (nonce) {
//         //console.log("Nonce", nonce)
//     }
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });



export default connectAPI;
