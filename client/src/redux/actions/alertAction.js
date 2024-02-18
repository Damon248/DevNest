import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { setAlert, removeAlert } from "../features/alert/alertSlice";

export const useAlertAction = () => {
  const dispatch = useDispatch();

  const alertAction = (message, alertType) => {
    const alertId = nanoid();
    dispatch(
      setAlert({
        id: alertId,
        message: message,
        alertType: alertType,
      })
    );
    setTimeout(() => {
      dispatch(removeAlert(alertId));
    }, 5000);
  };

  return alertAction;
};
