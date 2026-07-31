import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { rootStore } from "easemob-chat-uikit";
import type { RootState } from "./store";
import toast from "../components/toast/toast";

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (params: { userId: string; chatToken: string }, thunkAPI) => {
    const { client } = rootStore;
    const { userId, chatToken } = params;
    try {
      await client.login({
        userId,
        token: chatToken,
      });
      return {
        chatToken,
        userId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("login/logout", async () => {
  try {
    await rootStore.client.logout();
  } finally {
    rootStore.setLoginState(false);
    rootStore.clear();
    sessionStorage.removeItem("webImAuth");
  }
});

const serverConfig = JSON.parse(localStorage.getItem("serverConfig") || "{}");

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    phoneNumber: "",
    chatToken: "",
    userId: "",
    loggedIn: false,
    appKey: serverConfig.appkey || process.env.REACT_APP_APP_KEY || "org#app",
    useDNS: serverConfig.useCustomServer ? false : true,
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

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
      if (action.payload && state.userId) {
        window.sessionStorage.setItem(
          "webImAuth",
          JSON.stringify({
            userId: state.userId,
            chatToken: state.chatToken,
            phoneNumber: state.phoneNumber,
          })
        );
      }
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
            phoneNumber: state.phoneNumber,
          })
        );
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLogging = false;
        toast.error(
          (action.payload as { message?: string } | undefined)?.message ||
            action.error.message
        );
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.chatToken = "";
        state.userId = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.loggedIn = false;
        state.chatToken = "";
        state.userId = "";
        toast.error(action.error.message);
      });
  },
});

export const {
  setPhoneNumber,
  setChatToken,
  setLoggedIn,
  setIsLogging,
  setSDKConfig,
} = loginSlice.actions;

export default loginSlice.reducer;
export const selectState = (state: RootState) => state.login;
