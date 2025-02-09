import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearCartApi, deleteCartItemApi, fetchCartApi, fetchDataApi, fetchProductImage, postCartApi, updateCartItemApi } from "@/server-api/apifunctions/apiService";  // Adjust path as necessary
import { apiEndpoints } from "@/server-api/config/api.endpoints";

interface FormDataObject {
  [key: string]: string | Blob; 
}


export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCartApi();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || "Failed to fetch cart data.");
    }
  }
);

export const postCartData = createAsyncThunk(
  "cart/postCartData",
  async (postAPIValues: any, { rejectWithValue }) => {
    try {
      const response = await postCartApi(postAPIValues); 
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue(
        (error as { response: { data: { message: string } } }).response?.data?.message || (error as Error).message || "Failed to post cart data."
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (updateAPIValues: { formData?: Record<string, string | Blob>, [key: string]: string | number | boolean | FormDataObject | undefined;}, { rejectWithValue }) => {
    try {
      const response = await updateCartItemApi(updateAPIValues);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || 'Failed to update cart item.');
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (item_key: string, { rejectWithValue }) => {
    try {
      const response = await deleteCartItemApi(item_key);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || 'Failed to delete cart item.');
    }
  }
);

// export const fetchProductImages = createAsyncThunk(
//   "cart/fetchProductImages",
//   async (items: Array<{ id: number }>, { rejectWithValue }) => {
//     try {
//       const fetchProductImage = async (productId: number): Promise<string> => {
//         const apiEndpoint = apiEndpoints.products.productImage(productId);
//         const response = await fetchDataApi({apiEndpoint});
//         return response.data.images[0]?.src || "";
//       };

//       const images: Record<number, string> = {};
//       for (const item of items) {
//         images[item.id] = await fetchProductImage(item.id);
//       }

//       return images; // Map of productId -> imageUrl
//     } catch (error) {
//       return rejectWithValue("Failed to fetch product images.");
//     }
//   }
// );

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCartApi();
      return response.data as { message: string };
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message || 'Failed to delete cart item.');
    }
  }
);

