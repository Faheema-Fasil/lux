import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    LoginFormProps,
    RegisterFormProps,
  } from '@/helper/types'
import { loginUserApi, registerUserApi } from '@/server-api/apifunctions/apiService'

  export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: LoginFormProps, { rejectWithValue }) => {
      try {
        const response = await loginUserApi(userData)
        if (response?.data?.token) {
          return response.data
        } else {
          return rejectWithValue({ error: 'Token not found in response', response });
        }
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || 'Unexpected error occurred');
      }
    },
  )

  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: RegisterFormProps, { rejectWithValue }) => {
      try {
        const response = await registerUserApi(userData)
        if (response) {
          return response
        } else {
          return rejectWithValue({ error: 'Error registering user', response });
        }
      } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message || 'Unexpected error occurred');
      }
    },
  )
