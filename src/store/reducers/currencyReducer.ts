import { Reducer } from "redux";
import {
  CURRENCY_LIST_REQUEST,
  CURRENCY_LIST_SUCCESS,
  CURRENCY_LIST_FAIL,
} from "../../constants/currencyConstants";

import { CurrencyState } from "../types/types";

export const initialState: CurrencyState = {
  currency: [],
  errors: undefined,
  loading: false,
};

const currencyListReducer: Reducer<CurrencyState> = (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_LIST_REQUEST:
      return { ...state, loading: true };
    case CURRENCY_LIST_SUCCESS:
      return { ...state, loading: false, currency: action.payload };
    case CURRENCY_LIST_FAIL:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export { currencyListReducer };
