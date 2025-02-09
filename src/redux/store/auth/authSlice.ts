import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sliceNames } from '@/constants/redux';

import { UserDetails, UserState } from './authTypes';
import { loginUser } from './authApi';
import { getUser, setCartKey, storeUser } from '@/storage';
import { createServerConnectAPI } from '@/server-api/config/server-connect-api';

const userDetails = getUser();

const initialState: UserState = {
  isAuthenticated: Boolean(userDetails?.token),
  token: userDetails?.token || '',
  loading: false,
  displayName: userDetails?.user_display_name || '',
  email: userDetails?.user_email || '',
  user_nicename: userDetails?.user_nicename || '',
  phone: '',
  isVerified: false,
};

const authSlice = createSlice({
  name: sliceNames.auth,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDetails>) => {
      const userData = action.payload;
      if (userData === null) {
        return initialState;
      }
      try {
        const parsedUserData = typeof userData === 'string' ? JSON.parse(userData) : userData;
        state.isAuthenticated = parsedUserData?.token ? true : false;
        state.token = parsedUserData?.token || '';
        state.displayName = parsedUserData?.displayName || '';
        state.email = parsedUserData?.email || '';
        state.user_nicename = parsedUserData?.user_nicename || '';
        state.phone = parsedUserData?.phone || '';
        state.isVerified = parsedUserData?.isVerified || false;
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    },

    logOut: () => {
      storeUser(null);
      setCartKey(""); 
      localStorage.removeItem("cartKey");
      localStorage.removeItem("user"); 
      const apiClient = createServerConnectAPI();
      delete apiClient.defaults.headers['Authorization'];
      return {
        isAuthenticated: false,
        token: '',
        loading: false,
        displayName: '',
        email: '',
        user_nicename: '',
        phone: '',
        isVerified: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserDetails>) => {
          const { token, user_email, user_nicename, user_display_name } = action.payload;

          // setCartKey(""); 
          storeUser(null);
          state.isAuthenticated = Boolean(token);
          state.token = token || '';
          state.displayName = user_display_name || '';
          state.email = user_email || '';
          state.user_nicename = user_nicename || '';

          // storeJwtToken(action.payload)
          storeUser(action.payload);
          state.loading = false;
        }
      )
      .addCase(loginUser.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        storeUser(null)
      })
  }
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;