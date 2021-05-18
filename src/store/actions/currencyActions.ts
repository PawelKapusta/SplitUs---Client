import { Dispatch } from "redux";
import {
  CURRENCY_LIST_FAIL,
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
} from "../../constants/currencyConstants";
import http from "../../lib/axios";

export const listCurrencies = () => async (dispatch: Dispatch) => {
  dispatch({ type: CURRENCY_LIST_REQUEST });
  try {
    const { data } = await http.get("/currencyData");
    dispatch({ type: CURRENCY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CURRENCY_LIST_FAIL, payload: message });
  }
};
