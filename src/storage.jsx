import { localStorageValues } from "@/constants/local-storage-values";
import nookies from "nookies";

const key = "userDetails";

export const storeUser = (userData) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {
      console.log("Error storing the user data", error);
      return null;
    }
  } else {
    // Handle scenarios where localStorage is not available (server-side rendering)
    console.log('localStorage is not available on the server-side');
    return null;
  }
};

// export const storeJwtToken = (userData) => {
//   try {
//     nookies.set(null, 'auth_token', userData.token, {
//       maxAge: 30 * 24 * 60 * 60, 
//       path: '/', 
//       // secure: process.env.NODE_ENV === 'production', 
//       // httpOnly: false, 
//       // sameSite: 'Strict', 
//     });
//   } catch (error) {
//     console.log("Error storing the token", error);
//     return null;
//   }
// };

export const getUser = () => {
  if (typeof window === 'undefined') {
    // Handle scenarios where localStorage is not available (server-side rendering)
    console.log('localStorage is not available on the server-side');
    return null;
  }
  try {
    const storedUser = localStorage.getItem(key);
    // console.log("storedUser",storedUser)
    // console.log("JSON.parse(storedUser)",JSON.parse(storedUser))
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

export const setNonce = (nonce) => {
  try {
    localStorage.setItem("nonce", nonce)
  } catch (error) {
    console.log("Error storing nonce",error)
  }
}
export const setCartKey = (cartKey) => {
  try {
    localStorage.setItem("cartKey", cartKey)
  } catch (error) {
    console.log("Error storing cartKey",error)
  }
}

export const setCartHash = (cartKey) => {
  try {
    localStorage.setItem("cartHash", cartKey)
  } catch (error) {
    console.log("Error storing cartHash",error)
  }
}

export const getCartKey = () => {
  try {
    if (typeof window !== 'undefined') {
      const cartKey = localStorage.getItem("cartKey");
      return cartKey ?? "";
    }
  } catch (error) {
    console.log("Error getting the cartKey", error);
    return "";
  }
};

export const getCartHash = () => {
  try {
    if (typeof window !== 'undefined') {
      const cartHash = localStorage.getItem("cartHash");
      return cartHash ?? "";
    }
  } catch (error) {
    console.log("Error getting the cartHash", error);
    return "";
  }
};

export const getNonce = () => {
  const nonce = localStorage.getItem("nonce")
  return nonce ?? null;
};

export const getToken = () => {
  if (typeof window === 'undefined') {
    console.log('localStorage is not available on the server-side');
    return null;
  }
  try {
    const storedUser = localStorage.getItem(key);
    // console.log("JSON.parse(storedUser)?.token",JSON.parse(storedUser)?.token)
    return storedUser ? JSON.parse(storedUser)?.token : null;
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

export const deleteUser = () => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
    return null;

  }
};

export const storeData = (key, value) => {
  try {
    //alert("x-auth-token storage storeData"+key+" "+value);
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log("Error", e);
  }
}

export const getData = (key) => {
  try {
    const jsonValue = localStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error", e);
    return null;
  }
}


export const removeData = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.log("Error", e);
  }
}

export const getSelectedCountryFromLocalStorage = () => {
  const country = localStorage.getItem(localStorageValues.country);
  return country ? JSON.parse(country) : null;
};

export const getBasicSettingsFromLocalStorage = () => {
  const country = localStorage.getItem(localStorageValues.websiteSettings);
  return country ? JSON.parse(country) : null;
};

