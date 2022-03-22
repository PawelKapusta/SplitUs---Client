import { Reducer } from "redux";
import {
  QUESTIONS_FAQ_LIST_REQUEST,
  QUESTIONS_FAQ_LIST_SUCCESS,
  QUESTIONS_FAQ_LIST_FAIL,
  CREATE_QUESTION_FAQ_REQUEST,
  CREATE_QUESTION_FAQ_SUCCESS,
  CREATE_QUESTION_FAQ_FAIL,
} from "../../constants/questionsFaqConstants";
import { QuestionsFaqState } from "../types/types";
import {
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
} from "../../constants/billsConstants";

export const initialState: QuestionsFaqState = {
  questions: [],
  errors: undefined,
  loading: false,
};

const questionsFaqListReducer: Reducer<QuestionsFaqState> = (state = initialState, action) => {
  switch (action.type) {
    case QUESTIONS_FAQ_LIST_REQUEST:
      return { ...state, loading: true };
    case QUESTIONS_FAQ_LIST_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case QUESTIONS_FAQ_LIST_FAIL:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export const questionFaqCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CREATE_QUESTION_FAQ_REQUEST:
      return { loading: true };
    case CREATE_QUESTION_FAQ_SUCCESS:
      return { loading: false, success: true };
    case CREATE_QUESTION_FAQ_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { questionsFaqListReducer };
