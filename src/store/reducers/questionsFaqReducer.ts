import { Reducer } from "redux";
import {
  QUESTIONS_FAQ_LIST_REQUEST,
  QUESTIONS_FAQ_LIST_SUCCESS,
  QUESTIONS_FAQ_LIST_FAIL,
} from "../../constants/questionsFaqConstants";
import { QuestionsFaqState } from "../types/types";

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

export { questionsFaqListReducer };
