import { Dispatch } from "redux";
import {
  QUESTIONS_FAQ_LIST_REQUEST,
  QUESTIONS_FAQ_LIST_SUCCESS,
  QUESTIONS_FAQ_LIST_FAIL,
  CREATE_QUESTION_FAQ_FAIL,
  CREATE_QUESTION_FAQ_REQUEST,
  CREATE_QUESTION_FAQ_SUCCESS,
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

export const createQuestionFAQ = (Question: string, Answer: string) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({ type: CREATE_QUESTION_FAQ_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.post(
      `/questionsFaq`,
      {
        Question,
        Answer,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
      },
    );
    dispatch({ type: CREATE_QUESTION_FAQ_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CREATE_QUESTION_FAQ_FAIL, payload: message });
  }
};
