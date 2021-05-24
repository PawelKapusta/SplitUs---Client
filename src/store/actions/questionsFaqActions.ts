import { Dispatch } from "redux";
import {
  QUESTIONS_FAQ_LIST_REQUEST,
  QUESTIONS_FAQ_LIST_SUCCESS,
  QUESTIONS_FAQ_LIST_FAIL,
} from "../../constants/questionsFaqConstants";
import http from "../../lib/axios";

export const listQuestionsFaq = () => async (dispatch: Dispatch) => {
  dispatch({ type: QUESTIONS_FAQ_LIST_REQUEST });
  try {
    const { data } = await http.get("/questionsFaq");
    dispatch({ type: QUESTIONS_FAQ_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: QUESTIONS_FAQ_LIST_FAIL, payload: message });
  }
};
