import { LoginFormProps, RegisterFormProps } from "@/helper/types";
import { apiEndpoints } from "../config/api.endpoints";
import { AxiosResponse } from "axios";
import { createServerConnectAPI } from "../config/server-connect-api";
import { base64ToBlob } from "@/helper/helper";
import { fetchWithCache } from "../config/server-fetch";
import { getCartKey, getToken } from "@/storage";
import imageCompression from "browser-image-compression";

const serverConnectAPI = createServerConnectAPI(true);
const connectAPI = createServerConnectAPI(false);

const isBrowser = typeof window !== "undefined";

interface FetchDataParams {
  apiEndpoint: string;
  [key: string]: string | number | boolean | null;
}

interface FormDataObject {
  [key: string]: string | Blob;
}

export const loginUserApi = async (userData: LoginFormProps) => {
  try {
    const response = await connectAPI.post(apiEndpoints.auth.login, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

// //Register with wp api
// export const registerUserApi = async (userData: RegisterFormProps) => {
//   try {
//     const response = await serverConnectAPI.post(apiEndpoints.auth.register, userData);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const registerUserApi = async (userData: RegisterFormProps) => {
  try {
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

//Working register with woocommerce
// export const registerUserApi = async (userData: RegisterFormProps) => {
//   try {
//     const response = await serverConnectAPI.post(
//       apiEndpoints.auth.register,
//       userData
//     );
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await connectAPI.post(apiEndpoints.auth.forgotpassword, {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApi = async (key: string, login: string, newPassword: string) => {
  try {
    const response = await connectAPI.post(apiEndpoints.auth.resetpassword, {
      new_password: newPassword,
      reset_key: key,
      login: login,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const forgotPasswordApi = async (email: string) => {
//   try {
//     const response = await connectAPI.post(apiEndpoints.auth.forgotpassword, {
//       email,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
// export const setPasswordApi = async (
//   email: string,
//   password: string,
//   code: string
// ) => {
//   try {
//     const response = await connectAPI.post(apiEndpoints.auth.setpassword, {
//       email,
//       password,
//       code,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const validateCodeApi = async (email: string, code: string) => {
//   try {
//     const response = await connectAPI.post(apiEndpoints.auth.validatecode, {
//       email,
//       code,
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const changePasswordApi = async (password: string) => {
  const getCartKeyDynamic = getCartKey();
  try {
    const response = await connectAPI.post(`${apiEndpoints.auth.changepassword}/${getCartKeyDynamic}`, {
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCartApi = async (): Promise<AxiosResponse> => {
  const getCartKeyDynamic = getCartKey();
  const getTokenDynamic = getToken();
  // const url = getTokenDynamic
  //   ? `${apiEndpoints.cart.getcart}`
  //   : getCartKeyDynamic && getCartKeyDynamic.length > 10
  //   ? `${apiEndpoints.cart.getcart}?cart_key=${getCartKeyDynamic}`
  //   : `${apiEndpoints.cart.getcart}`;

  const url =
    getCartKeyDynamic && getCartKeyDynamic.length > 10 && getTokenDynamic
      ? `${apiEndpoints.cart.getcart}?cart_key=${getCartKeyDynamic}`
      : getTokenDynamic && getCartKeyDynamic && getCartKeyDynamic.length < 5
      ? `${apiEndpoints.cart.getcart}`
      : getCartKeyDynamic && getCartKeyDynamic.length > 10
      ? `${apiEndpoints.cart.getcart}?cart_key=${getCartKeyDynamic}`
      : `${apiEndpoints.cart.getcart}`;
  return await connectAPI.get(url);
};

export const postCartApi = async (postAPIValues: {
  formData?: any;
  [key: string]: string | number | boolean | File | undefined;
}) => {
  const formDataObject = new FormData();
  const getCartKeyDynamic = getCartKey();
  const getTokenDynamic = getToken();

  // Append all entries to FormData
  Object.entries(postAPIValues).forEach(([key, value]) => {
    if (value instanceof File) {
      formDataObject.append(key, value); // Append file
    } else if (value !== undefined && value !== null) {
      formDataObject.append(key, String(value)); // Append other values as strings
    }
  });

  const url = `${apiEndpoints.cart.addtocart}${
    !getTokenDynamic && getCartKeyDynamic && getCartKeyDynamic.length ? `?cart_key=${getCartKeyDynamic}` : ``
  }`;

  return await connectAPI.post(url, formDataObject);

  // Make the API call
  // return await connectAPI.post(apiEndpoints.cart.addtocart(), formDataObject);
};

// export const postCartApi = async (postAPIValues: {
//   formData?: any;
//   [key: string]: string | number | boolean | FormDataObject | undefined;
// }) => {
//   const { formData, ...restParams } = postAPIValues;

//   if (formData) {
//     const formDataObject = new FormData();
//     for (const key in formData) {
//       if (Object.prototype.hasOwnProperty.call(formData, key)) {
//         formDataObject.append(key, formData[key]);
//       }
//     }
//     return await connectAPI.post(apiEndpoints.cart.addtocart(), formDataObject);
//   } else {
//     const addToCartUrl = apiEndpoints.cart.addtocart(restParams);
//     return await connectAPI.post(addToCartUrl);
//   }
// };

export const updateCartItemApi = async (updateAPIValues: {
  formData?: Record<string, string | Blob>;
  [key: string]: any;
}) => {
  const { formData, ...params } = updateAPIValues;
  const getCartKeyDynamic = getCartKey();

  if (formData) {
    const formDataObject = new FormData();
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        formDataObject.append(key, formData[key]);
      }
    }
    // const updateCartUrl = apiEndpoints.cart.updateCartItem();
    const updateCartUrl = `${apiEndpoints.cart.updateCartItem}${getCartKeyDynamic}`;
    return await connectAPI.put(updateCartUrl, formDataObject);
  } else {
    const queryParams = new URLSearchParams(params).toString();
    const updateCartUrl = `${apiEndpoints.cart.updateCartItem}${getCartKeyDynamic}${queryParams}`;
    return await connectAPI.put(updateCartUrl, params);
  }
};

export const deleteCartItemApi = async (item_key: string) => {
  const getCartKeyDynamic = getCartKey();
  const getTokenDynamic = getToken();
  const deleteCartUrl = `${apiEndpoints.cart.deleteCartItem(item_key)}${
    !getTokenDynamic ? `?cart_key=${getCartKeyDynamic}` : ``
  }`;
  return await connectAPI.delete(deleteCartUrl);
};

export const clearCartApi = async () => {
  const deleteCartUrl = apiEndpoints.cart.clearcart;
  return await connectAPI.post(deleteCartUrl);
};

export const uploadImageApi = async (imgData: any, fileName: string, size: number = 0.1): Promise<any> => {
  const formData = new FormData();
  let file: File;

  if (typeof imgData === "string") {
    file = base64ToBlob(imgData, "image/png") as File;
  } else {
    file = new File([imgData], fileName, {
      type: imgData.type,
      lastModified: Date.now(),
    });
  }

  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: size, // Set max file size (e.g., 500KB)
      maxWidthOrHeight: 1024, // Set max width or height
      useWebWorker: true, // Use web workers for better performance
    });

    formData.append("file", compressedFile, fileName);
    formData.append("title", fileName);
    formData.append("alt_text", fileName);

    const response = await fetch(`/api/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(`Image upload failed: ${err.message}`);
  }
};

// // Image upload with compression
// export const uploadImageApi = async (image: string | Blob, imageName: string = "customized-product.png") => {
//   let file: File;

//   if (typeof image === "string") {
//     file = base64ToBlob(image, "image/png") as File; // Base64 to Blob conversion
//   } else {
//     // Convert Blob to File
//     file = new File([image], imageName, {
//       type: image.type,
//       lastModified: Date.now(),
//     });
//   }

//   try {
//     // Compress the image
//     const compressedFile = await imageCompression(file, {
//       maxSizeMB: 0.5, // Set max file size (e.g., 200KB)
//       maxWidthOrHeight: 1024, // Set max width or height
//       useWebWorker: true, // Use web workers for better performance
//     });

//     console.log(
//       `Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB, Compressed size: ${(
//         compressedFile.size /
//         1024 /
//         1024
//       ).toFixed(2)} MB`
//     );

//     // Prepare the compressed file for upload
//     const formData = new FormData();
//     formData.append("media_attachment", imageName);
//     formData.append("file", compressedFile, imageName);
//     formData.append("title", imageName);
//     formData.append("alt_text", imageName);

//     const response = await serverConnectAPI.post(apiEndpoints.products.addImage, formData);

//     if (!response || !response.data) {
//       throw new Error(`Error uploading image: ${response?.statusText || "No response data"}`);
//     }

//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.error("Image Upload Failed:", error);
//     throw error;
//   }
// };

// Image upload without compression (working)
// export const uploadImageApi = async (
//   image: string | Blob,
//   imageName: string = "customized-product.png"
// ) => {
//   let file: Blob;
//   if (typeof image === "string") {
//     file = base64ToBlob(image, "image/png");
//   } else {
//     file = image;
//   }

//   const formData = new FormData();
//   formData.append("media_attachment", imageName);
//   formData.append("file", file, imageName);
//   formData.append("title", imageName);
//   formData.append("alt_text", imageName);

//   try {
//     const response = await serverConnectAPI.post(
//       apiEndpoints.products.addImage,
//       formData
//     );

//     if (!response || !response.data) {
//       throw new Error(
//         `Error uploading image: ${response?.statusText || "No response data"}`
//       );
//     }
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.error("Image Upload Failed:", error);
//     throw error;
//   }
// };

// Working place order without payment gateway (for testing)
// export const placeOrderApi = async (formData: FormDataType, items: ItemProps[]) => {
//   const form = new FormData();

//   form.append("payment_method", "telr");
//   form.append("payment_method_title", "Telr Payment Gateway");
//   form.append("set_paid", "false");

//   // Add billing details
//   for (const [key, value] of Object.entries({
//     first_name: formData.billingname,
//     last_name: "",
//     address_1: formData.billingAddress,
//     address_2: "",
//     city: formData.city,
//     state: formData.city,
//     postcode: formData.zipCode,
//     country: formData.billingCountry,
//     email: formData.email,
//     phone: formData.billingphone,
//   })) {
//     form.append(`billing[${key}]`, value);
//   }

//   // Add shipping details
//   for (const [key, value] of Object.entries({
//     first_name: formData.shippingname,
//     last_name: "",
//     address_1: formData.shippingAddress,
//     address_2: "",
//     city: formData.city,
//     state: formData.city,
//     postcode: formData.zipCode,
//     country: formData.shippingCountry,
//     phone: formData.shippingphone,
//   })) {
//     form.append(`shipping[${key}]`, value);
//   }

//   // Loop through items to add product and metadata
//   items.forEach((item: ItemProps, index: number) => {
//     form.append(`line_items[${index}][product_id]`, item.id.toString());
//     form.append(
//       `line_items[${index}][quantity]`,
//       item.quantity.value.toString()
//     );

//     const metaData: { key: string; value: string }[] = [];

//     // Extract all custom fields from wcpa_data
//     const wcpaData = item.cart_item_data?.wcpa_data || {};
//     Object.keys(wcpaData)
//       .filter((key) => key.startsWith("sec"))
//       .forEach((secKey) => {
//         const section = wcpaData[secKey];
//         if (section?.fields) {
//           if (Array.isArray(section.fields)) {
//             // Handle array-based fields
//             section.fields.forEach((fieldGroup) => {
//               if (Array.isArray(fieldGroup)) {
//                 fieldGroup.forEach((fieldItem) => {
//                   metaData.push({
//                     key: fieldItem.label || "Unknown Label",
//                     value: fieldItem.value || "Not Provided",
//                   });
//                 });
//               }
//             });
//           } else {
//             // Handle object-based fields
//             Object.keys(section.fields).forEach((fieldKey) => {
//               const fieldGroup = section.fields[fieldKey];
//               fieldGroup.forEach((fieldItem: any) => {
//                 metaData.push({
//                   key: fieldItem.label || "Unknown Label",
//                   value: fieldItem.value || "Not Provided",
//                 });
//               });
//             });
//           }
//         }
//       });

//     // Append meta_data for each line item
//     metaData.forEach((meta, metaIndex) => {
//       form.append(
//         `line_items[${index}][meta_data][${metaIndex}][key]`,
//         meta.key
//       );
//       form.append(
//         `line_items[${index}][meta_data][${metaIndex}][value]`,
//         meta.value
//       );
//     });
//   });

//   try {
//     const response = await serverConnectAPI.post(
//       apiEndpoints.order.placeorder,
//       form
//     );

//     if (!response || !response.data) {
//       throw new Error("Failed to place order: No response data");
//     }

//     // Return the response
//     return response.data;
//   } catch (error) {
//     console.error("Error placing order:", error);
//     throw error;
//   }
// };

export const placeOrderApi = async (formData: any) => {
  const getCartKeyDynamic = getCartKey();
  const getTokenDynamic = getToken();
  const dataToSend = {
    total_amount: 1,
    currency: "AED",
    cart_key: getTokenDynamic ? "" : getCartKeyDynamic,
    delivery_method: formData.deliveryMethod,
    int_shipping_charge: formData.int_shipping_charge,
  };

  try {
    const response = await connectAPI.post(apiEndpoints.order.placeorder, {
      total_amount: 1,
      currency: "AED",
      cart_key: getTokenDynamic ? "" : getCartKeyDynamic,
      delivery_method: formData.deliveryMethod,
      int_shipping_charge: formData.int_shipping_charge,
    });
    if (!response || !response.data) {
      throw new Error("Failed to place order: No response data");
    }
    // Return the response
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const placeGuestOrderApi = async (addressType: "billing" | "shipping", formData: any) => {
  const getCartKeyDynamic = getCartKey();
  try {
    const response = await connectAPI.post(apiEndpoints.order.placeorder, {
      total_amount: 1,
      currency: "AED",
      cart_key: getCartKeyDynamic,
      delivery_method: formData.deliveryMethod,
      int_shipping_charge: formData.int_shipping_charge,
      password: formData.password,
      [addressType]: {
        first_name: addressType === "billing" ? formData.billingname : formData.shippingname,
        last_name: "",
        address_1: addressType === "billing" ? formData.billingaddress : formData.shippingaddress,
        address_2: "",
        city: formData.shippingcity,
        state: formData.shippingcity,
        postcode: formData.shippingzipcode,
        country: addressType === "billing" ? formData.billingcountry : formData.shippingcountry,
        email: formData.email,
        phone: addressType === "billing" ? formData.billingphone : formData.shippingphone,
      },
    });
    if (!response || !response.data) {
      throw new Error("Failed to place order: No response data");
    }
    // Return the response
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const formData = new URLSearchParams();
//   for (const [key, value] of Object.entries(req.body)) {
//     formData.append(key, value);
//   }

//   try {
//     const response = await fetch("https://your-wordpress-backend.com/telr-process", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formData.toString(),
//     });

//     if (!response.ok) {
//       return res.status(response.status).json({ message: "Error processing payment" });
//     }

//     const result = await response.json();
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

//DIRECT WOOCOMEERCE ORDER CREATION
// export const placeOrderApi = async (
//   formData: FormDataType,
//   items: ItemProps[]
// ) => {
//   // //console.log("items",items)
//   const form = new FormData();

//   form.append("payment_method", "telr");
//   form.append("payment_method_title", "Telr Payment Gateway");
//   form.append("set_paid", "false");
//   // form.append("payment_method", "bacs");
//   // form.append("payment_method_title", "Direct Bank Transfer");
//   // form.append("set_paid", "true");

//   for (const [key, value] of Object.entries({
//     first_name: formData.billingname,
//     last_name: "",
//     address_1: formData.billingAddress,
//     address_2: "",
//     city: formData.city,
//     state: formData.city,
//     postcode: formData.zipCode,
//     country: formData.billingCountry,
//     email: formData.email,
//     phone: formData.billingphone,
//   })) {
//     form.append(`billing[${key}]`, value);
//   }

//   for (const [key, value] of Object.entries({
//     first_name: formData.shippingname,
//     last_name: "",
//     address_1: formData.shippingAddress,
//     address_2: "",
//     city: formData.city,
//     state: formData.city,
//     postcode: formData.zipCode,
//     country: formData.shippingCountry,
//     phone: formData.shippingphone,
//   })) {
//     form.append(`shipping[${key}]`, value);
//   }
//   items.forEach((item: ItemProps, index: number) => {
//     form.append(`line_items[${index}][product_id]`, item.id.toString());
//     form.append(
//       `line_items[${index}][quantity]`,
//       item.quantity.value.toString()
//     );

//     const metaData: { key: string; value: string }[] = [];

//     if (item.cart_item_data?.wcpa_data) {
//       const sec_4672b4d3442d91 =
//         item.cart_item_data.wcpa_data["sec_4672b4d3442d91"];

//       if (sec_4672b4d3442d91?.fields) {
//         Object.keys(sec_4672b4d3442d91.fields).forEach((fieldIndex) => {
//           const fieldGroup = sec_4672b4d3442d91.fields[fieldIndex];

//           if (Array.isArray(fieldGroup)) {
//             fieldGroup.forEach((fieldItem) => {
//               metaData.push({
//                 key: fieldItem.label || "Unknown Label",
//                 value: fieldItem.value || "",
//               });
//             });
//           }
//         });
//       }
//     }

//     metaData.forEach((meta, metaIndex) => {
//       form.append(
//         `line_items[${index}][meta_data][${metaIndex}][key]`,
//         meta.key
//       );
//       form.append(
//         `line_items[${index}][meta_data][${metaIndex}][value]`,
//         meta.value
//       );
//     });
//   });

//   try {
//     const response = await serverConnectAPI.post(
//       apiEndpoints.order.placeorder,
//       form
//     );

//     if (!response || !response.data) {
//       throw new Error("Failed to place order: No response data");
//     }

//     //console.log("Order placed successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error placing order:", error);
//     throw error;
//   }
// };

export const updatePaymentStatusApi = async (orderId: number, status: any) => {
  try {
    const form = new FormData();
    form.append("status", status);

    const response = await serverConnectAPI.post(apiEndpoints.order.updateorder(orderId), form);

    if (!response || !response.data) {
      throw new Error("Failed to update payment status: No response data");
    }

    //console.log("Payment status updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};

// export const createPaymentApi = async (
//   orderId: number,
//   total: number,
//   currency: string = "AED"
// ) => {
//   if (!orderId || !total) {
//     throw new Error("Invalid Order ID or Total");
//   }

//   try {
//     const telrResponse = await serverConnectAPI.post(
//       apiEndpoints.order.telrurl,
//       {
//         store_id: 27951,
//         key: "18642061M2FD9tBTChk6n$sr",
//         tran_ref: orderId,
//         tran_total: total,
//         tran_currency: currency,
//         tran_testmode: 1,
//         tran_return: apiEndpoints.order.returnurl(orderId),
//         tran_cancel: apiEndpoints.order.cancelurl,
//         tran_decline: apiEndpoints.order.declineurl(orderId),
//         tran_desc: "Goods purchase",
//         tran_lang: "en",
//       }
//     );

//     if (telrResponse.data.error) {
//       return { message: telrResponse.data.error.message };
//     }

//     const paymentUrl = telrResponse.data.redirect_url;
//     return { payment_url: paymentUrl };

//   } catch (error: any) {
//     console.error("Error creating Telr payment:", error.response?.data || error.message);
//     return { message: "Failed to create Telr payment" };
//   }
// };

// export const createPaymentApi = async (
//   orderId: number,
//   total: number,
//   currency: string = "AED"
// ) => {
//   if (!orderId || !total) {
//     throw new Error("Invalid Order ID or Total");
//   }

//   try {
//     const paymentResponse = await serverConnectAPI.post(
//       apiEndpoints.order.telrurl,
//       {
//         tran_ref: orderId,
//         tran_total: total,
//         tran_currency: currency,
//         tran_testmode: 1, // Test mode flag for the mock API
//       }
//     );

//     const paymentResult = paymentResponse.data;

//     if (
//       paymentResult.auth_status === "A" &&
//       paymentResult.tran_status === "paid"
//     ) {
//       // Payment successful: Update WooCommerce order status to 'completed'
//       const updateResponse = await updatePaymentStatusApi(orderId, "completed");

//       if (updateResponse.status === "completed") {
//         return {
//           status: "success",
//           message: "Payment successful and order updated",
//           paymentResult,
//         };
//       }
//     } else {
//       console.error(
//         "Error handling Telr payment: Payment failed or invalid response",
//         paymentResult
//       );
//       return {
//         status: "failed",
//         message: "Payment failed",
//         paymentResult,
//       };
//     }
//   } catch (error) {
//     console.error("Error handling Telr payment:", error);
//     return {
//       message: "Internal server error",
//       error,
//     };
//   }
// };

export const updateCustomerAddress = async (addressType: "billing" | "shipping", formData: any): Promise<any> => {
  try {
    const cartKey = getCartKey();

    const body = {
      cartKey,
      [addressType]: {
        first_name: addressType === "billing" ? formData.billingname : formData.shippingname,
        last_name: "",
        address_1: addressType === "billing" ? formData.billingaddress : formData.shippingaddress,
        address_2: "",
        city: addressType === "billing" ? formData.billingcity : formData.shippingcity,
        state: addressType === "billing" ? formData.billingstate : formData.shippingstate,
        postcode: addressType === "billing" ? formData.billingzipcode : formData.shippingzipcode,
        country: addressType === "billing" ? formData.billingcountry : formData.shippingcountry,
        email: formData.email,
        phone: addressType === "billing" ? formData.billingphone : formData.shippingphone,
      },
    };

    const response = await fetch(`/api/customer/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

// export const updateCustomerAddress = async (addressType: "billing" | "shipping", formData: any) => {
//   const getCartKeyDynamic = getCartKey();
//   try {
//     console.log("formData from api", formData);
//     const response = await serverConnectAPI.put(`${apiEndpoints.user.updateprofile}${getCartKeyDynamic}`, {
//       [addressType]: {
//         first_name: addressType === "billing" ? formData.billingname : formData.shippingname,
//         last_name: "",
//         address_1: addressType === "billing" ? formData.billingaddress : formData.shippingaddress,
//         address_2: "",
//         city: formData.shippingcity,
//         state: formData.shippingcity,
//         postcode: formData.shippingzipcode,
//         country: addressType === "billing" ? formData.billingcountry : formData.shippingcountry,
//         email: formData.email,
//         phone: addressType === "billing" ? formData.billingphone : formData.shippingphone,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating ${addressType} address:`, error);
//     return error;
//   }
// };

export const updateCustomerCountry = async (country: string): Promise<any> => {
  try {
    const cartKey = getCartKey();

    const body = {
      cartKey,
      shipping: {
        country: country,
      },
      billing: {
        country: country,
      },
    };

    const response = await fetch(`/api/country`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating country:", error);
    throw error;
  }
};

// export const updateCustomerCountry = async (
//   // addressType: "billing" | "shipping",
//   country: string
// ) => {
//   const getCartKeyDynamic = getCartKey();
//   try {
//     const response = await serverConnectAPI.put(`${apiEndpoints.user.updateprofile}${getCartKeyDynamic}`, {
//       shipping: {
//         country: country,
//       },
//       billing: {
//         country: country,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // console.error(`Error updating ${addressType} address:`, error);
//     return error;
//   }
// };

export const updateCustomerProfile = async (formData: any): Promise<any> => {
  try {
    const cartKey = getCartKey();

    if (!cartKey) {
      throw new Error("Cart Key is missing.");
    }

    const body = {
      cartKey,
      // display_name: formData.displayname,
      email: formData.email,
      shipping: {
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
      },
      billing: {
        phone: formData.phone,
      },
      // username: formData.username,
    };

    if (
      // !body.display_name ||
      !body.email ||
      !body.shipping ||
      !body.billing
      // !body.username
    ) {
      throw new Error("Missing required profile data.");
    }

    const response = await fetch(`/api/customer/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || `Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// export const updateCustomerProfile = async (formData: any) => {
//   const getCartKeyDynamic = getCartKey();
//   try {
//     const response = await serverConnectAPI.post(`${apiEndpoints.user.updateprofile}${getCartKeyDynamic}`, {
//       display_name: formData.displayname,
//       email: formData.email,
//       shipping: {
//         phone: formData.phone,
//         email: formData.email,
//         country: formData.country,
//       },
//       billing: {
//         phone: formData.phone,
//       },
//       username: formData.username,
//     });
//     if (response.data.status === 400) {
//       throw new Error(response.data.message || "Bad Request");
//     }
//     return response.data;
//   } catch (error: any) {
//     console.error("Error updating profile:", error);
//     if (error.response && error.response.data) {
//       const { message, errors } = error.response.data;
//       if (errors) {
//         throw new Error(Object.values(errors).join("\n"));
//       }
//       throw new Error(message || "Error updating profile");
//     }
//     throw error; // Handle the error
//   }
// };

export const getCountryDataApi = async (iso2?: string) => {
  return await connectAPI.get(apiEndpoints.country.countrydata(iso2));
};

export const contactUsFormApi = async (formData: any) => {
  try {
    const response = await connectAPI.post(apiEndpoints.contactus.form, {
      name: formData.name,
      email: formData.email,
      number: formData.phone,
      subject: formData.subject,
      message: formData.message,
      recaptcha_response: formData.captchaToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form", error);
    return error;
  }
};

export const CancelOrderApi = async (orderId: number | string): Promise<any> => {
  try {
    const response = await fetch(`/api/order/cancel?orderId=${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error canceling the order:", error);
    throw error;
  }
};

// export const CancelOrderApi = async (orderId: number | string) => {
//   return await serverConnectAPI.delete(apiEndpoints.order.updateorder(orderId));
// };

export const getCustomerOrders = async () => {
  const response = await connectAPI.get(`${apiEndpoints.order.orders}${getCartKey()}`, {});
  return response.data;
};

export const updateWcOrderStatus = async (order_id: number, OrderRef: string) => {
  return await connectAPI.post(apiEndpoints.order.updatestatus(order_id, OrderRef));
};

export const updateOrderStatus = async () => {
  return await connectAPI.get(apiEndpoints.order.updateorder());
};

export const fetchOrderDetails = async (oid?: number | string) => {
  return await fetchWithCache(apiEndpoints.order.orderdetails(oid), {
    cache: "no-cache",
    authRequired: true,
  });
};

export const fetchMenuApi = async (url: string) => {
  return await fetchWithCache(url);
};

export const fetchContactUsApi = async () => {
  return await fetchWithCache(apiEndpoints.contactus.content);
};

export const fetchProductImageApi = async (id: number | string) => {
  return await fetchWithCache(apiEndpoints.products.productImage(id));
};

export const fetchHomePageTitlesApi = async () => {
  return await fetchWithCache(apiEndpoints.homepage.titles);
};
export const fetchAboutUsPageApi = async () => {
  return await fetchWithCache(apiEndpoints.aboutus.content);
};

export const fetchCardCategoriesContentApi = async () => {
  return await fetchWithCache(apiEndpoints.homepage.cardcategories, {
    authRequired: true,
  });
};

export const fetchExploreCollectionsApi = async (id: number): Promise<AxiosResponse> => {
  return await serverConnectAPI.get(apiEndpoints.homepage.cardcollection(id));
};
export const fetchHowItWorksApi = async () => {
  return await fetchWithCache(apiEndpoints.homepage.howitworks);
};

export const fetchFeaturesApi = async () => {
  return await fetchWithCache(apiEndpoints.homepage.features);
};
export const fetchTestimonialsApi = async () => {
  return await fetchWithCache(apiEndpoints.homepage.testimonials);
};

export const fetchCustomPageApi = async () => {
  const homeData = await fetchWithCache(apiEndpoints.custom.home);
  const featuresData = await fetchWithCache(apiEndpoints.custom.features);
  return { homeData, featuresData };
};

export const fetchBusinessCardData = async () => {
  const contentData = await fetchWithCache(apiEndpoints.businesscard.content);
  const featuresData = await fetchWithCache(apiEndpoints.businesscard.features);
  return { contentData, featuresData };
};

export const fetchJewelleryCardData = async () => {
  return await fetchWithCache(apiEndpoints.jewellerycard.content);
};

export const fetchMetalNfcCardData = async () => {
  return await fetchWithCache(apiEndpoints.metalnfccard.metalnfccard);
};

export const fetchPaymentsAndWhiteLabellingData = async () => {
  const featuresData = await fetchWithCache(apiEndpoints.whitelabelling.whitelabellingfeatues);
  const contentData = await fetchWithCache(apiEndpoints.whitelabelling.whitelabelling);
  const cards = await fetchWithCache(apiEndpoints.whitelabelling.whitelabellingcards);
  return { contentData, featuresData, cards };
};

export const fetchDualChipCardData = async () => {
  const contentData = await fetchWithCache(apiEndpoints.dualchip.content);
  const featuresData = await fetchWithCache(apiEndpoints.dualchip.features);
  return { contentData, featuresData };
};
export const fetchMetalNfcCardFeaturesGrid = async () => {
  return await fetchWithCache(apiEndpoints.metalnfccard.metalnfcfeaturesgrid);
};
export const fetchMetalNfcCardFeaturesColumn = async () => {
  return await fetchWithCache(apiEndpoints.metalnfccard.metalnfcfeaturescolumn);
};

// export const fetchProductsApi = async (perpage: number, page: number) => {
//   return await fetchWithCache(apiEndpoints.products.productLists(perpage, page), {
//     authRequired: true,
//   });
// };

// export const fetchProductsApi = async (perpage: number, page: number) => {
//   const response = await fetch(
//     `/api/products?perpage=${perpage}&page=${page}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return response.json();
// };

export const fetchProductsApi = async (perpage: number, page: number, category?: string) => {
  const response = await fetch(
    `/api/products?perpage=${perpage}&page=${page}${category && category !== null && `&category=${category}`}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const fetchProductsBySearchApi = async (slug: string | number) => {
  return await fetchWithCache(apiEndpoints.products.search(slug), {
    // authRequired: true,
    cache: "no-cache",
  });
};

export const fetchProductDetails = async (slug: number) => {
  return await fetchWithCache(apiEndpoints.products.productDetails(slug), {
    authRequired: true,
  });
};

export const fetchProductImage = async (id: number | string) => {
  return await fetchWithCache(apiEndpoints.products.productImage(id), {
    authRequired: true,
  });
};

export const fetchFaqApi = async () => {
  return await fetchWithCache(apiEndpoints.pages.faq);
};

export const fetchTermsAndConditionsApi = async () => {
  return await fetchWithCache(apiEndpoints.pages.termsandconditions);
};

export const fetchPrivacyPolicyApi = async () => {
  return await fetchWithCache(apiEndpoints.pages.privacypolicy);
};

export const fetchFooterContentApi = async () => {
  try {
    const quickLinks = (await fetchWithCache(apiEndpoints.menu.footerquicklinks)) || [];
    const customerSupport = (await fetchWithCache(apiEndpoints.menu.footercustomersupport)) || [];
    const startCustomization = (await fetchWithCache(apiEndpoints.menu.footercustomization)) || [];
    const about = (await fetchWithCache(apiEndpoints.menu.about)).acf || null;

    return { quickLinks, customerSupport, startCustomization, about };
  } catch (error) {
    console.error("Error fetching footer content:", error);
    return {
      quickLinks: [],
      customerSupport: [],
      startCustomization: [],
      about: null,
    };
  }
};

// export const fetchDataApi = async (id: number) => {
//   console.log("idfromfetchdataapi", id);
//   const response = await fetch(`/api/productdetails?id=${id}`);

//   if (!response.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return response.json();
// };

export const fetchDataApi = async (id: number) => {
  return await fetchWithCache(apiEndpoints.products.productDetails(id), {
    authRequired: true,
  });
};

export const fetchDataClientApi = async (params: { apiEndpoint: string, [key: string]: string }) => {
  const { apiEndpoint, ...restParams } = params;

  try {
    const queryParams = new URLSearchParams({
      apiEndpoint, 
      ...restParams
    }).toString();

    const response = await fetch(`/api/custom?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("Client-side error:", error);
    throw new Error(error.message || "An error occurred while fetching data.");
  }
};


// export const fetchDataApi = async (
//   params: FetchDataParams = { apiEndpoint: "" },
//   origin?: string | null | undefined
// ) => {
//   const { apiEndpoint, ...restParams } = params;

//   return await serverConnectAPI.get(apiEndpoint, {
//     params: restParams,
//     headers: {
//       Origin: origin,
//     },
//   });
// };
