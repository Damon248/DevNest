import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { id, message, alertType } = action.payload;
      const alert = {
        id: id || nanoid(),
        msg: message,
        alertType: alertType,
      };
      state.push(alert);
    },
    removeAlert: (state, action) => {
      const alertIdToRemove = action.payload;
      return state.filter((alert) => alert.id !== alertIdToRemove);
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
