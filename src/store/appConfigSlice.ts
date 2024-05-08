import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import { GeneralConfig } from "../pages/settings/general/general";
const initialState: GeneralConfig & { notification: boolean } = {
  language: window.navigator.language,
  theme: "classic",
  typing: true,
  dark: false,
  color: { h: 203, s: 1, l: 0.5, a: 1 },
  translation: true,
  thread: true,
  reaction: true,
  notification: false,
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateAppConfig: (
      state,
      action: PayloadAction<Partial<GeneralConfig & { notification: boolean }>>
    ) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setLanguage, updateAppConfig } = appConfigSlice.actions;

export default appConfigSlice.reducer;

export const selectState = (state: RootState) => state.appConfig;
