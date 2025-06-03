import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { rootStore } from "../UIKit/uikitListener";
import type { RootState } from "./store";
import { appKey } from "../config";
import toast from "../components/toast/toast";

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (params: { userId: string; chatToken: string }, thunkAPI) => {
    const { client } = rootStore;
    const { userId, chatToken } = params;
    try {
      await client.open({
        user: userId,
        accessToken: chatToken,
      });
      return {
        chatToken,
        userId: userId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    phoneNumber: "",
    chatToken: "",
    password: "",
    userId: "",
    loggedIn: false,
    appKey: appKey,
    useDNS: true,
    isLogging: false,
  },
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setIsLogging: (state, action: PayloadAction<boolean>) => {
      state.isLogging = action.payload;
    },
    setChatToken: (state, action: PayloadAction<string>) => {
      state.chatToken = action.payload;
    },

    loginWithToken: (
      state,
      action: PayloadAction<{ userId: string; chatToken: string }>
    ) => {
      const { client } = rootStore;
      client
        .open({
          user: action.payload.userId,
          accessToken: action.payload.chatToken,
        })
        .catch((err: any) => {
          toast.error(err.message);
          console.log("loginWithToken error", err);
        });
      state.userId = action.payload.userId;
      state.chatToken = action.payload.chatToken;
    },

    loginWithPassword: (
      state,
      action: PayloadAction<{ userId: string; password: string }>
    ) => {
      const { client } = rootStore;
      client.open({
        user: action.payload.userId,
        pwd: action.payload.password,
      });
      state.userId = action.payload.userId;
      state.password = action.payload.password;
    },

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
      if (action.payload && state.userId) {
        window.sessionStorage.setItem(
          "webImAuth",
          JSON.stringify({
            userId: state.userId,
            chatToken: state.chatToken,
            password: state.password,
          })
        );
      }
    },

    logout: (state) => {
      const { client } = rootStore;
      rootStore.clear();
      client.close();
      state.loggedIn = false;
      sessionStorage.removeItem("webImAuth");
    },

    setSDKConfig: (
      state,
      action: PayloadAction<{ appKey: string; useDNS: boolean }>
    ) => {
      state.appKey = action.payload.appKey;
      state.useDNS = action.payload.useDNS;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLogging = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLogging = false;
        state.loggedIn = true;
        state.userId = action.payload.userId;
        state.chatToken = action.payload.chatToken;
        window.sessionStorage.setItem(
          "webImAuth",
          JSON.stringify({
            userId: state.userId,
            chatToken: state.chatToken,
            password: state.password,
          })
        );
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLogging = false;
        toast.error(action.error.message);
      });
  },
});

export const {
  setPhoneNumber,
  setChatToken,
  loginWithToken,
  loginWithPassword,
  setLoggedIn,
  setIsLogging,
  logout,
  setSDKConfig,
} = loginSlice.actions;

export default loginSlice.reducer;
export const selectState = (state: RootState) => state.login;
