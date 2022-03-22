import {
  BILL_DETAILS_FAIL,
  BILL_DETAILS_REQUEST,
  BILL_DETAILS_SUCCESS,
  BILL_USERS_FAIL,
  BILL_USERS_REQUEST,
  BILL_USERS_SUCCESS,
  BILLS_LIST_FAIL,
  BILLS_LIST_REQUEST,
  BILLS_LIST_SUCCESS,
  COMMENTS_LIST_FAIL,
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_BILL_FAIL,
  DELETE_BILL_REQUEST,
  DELETE_BILL_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  GROUP_BILLS_LIST_FAIL,
  GROUP_BILLS_LIST_REQUEST,
  GROUP_BILLS_LIST_SUCCESS,
  OWNERS_BILLS_LIST_FAIL,
  OWNERS_BILLS_LIST_REQUEST,
  OWNERS_BILLS_LIST_SUCCESS,
  SETTLE_UP_UPDATE_BILL_FAIL,
  SETTLE_UP_UPDATE_BILL_REQUEST,
  SETTLE_UP_UPDATE_BILL_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_REQUEST,
  UPDATE_BILL_RESET,
  UPDATE_BILL_SUCCESS,
  UPDATE_CODE_QR_BILL_FAIL,
  UPDATE_CODE_QR_BILL_REQUEST,
  UPDATE_CODE_QR_BILL_SUCCESS,
} from "../../constants/billsConstants";

export const billsListReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case BILLS_LIST_REQUEST:
      return { loading: true };
    case BILLS_LIST_SUCCESS:
      return { loading: false, bills: action.payload };
    case BILLS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ownerBillsListReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case OWNERS_BILLS_LIST_REQUEST:
      return { loading: true };
    case OWNERS_BILLS_LIST_SUCCESS:
      return { loading: false, bills: action.payload };
    case OWNERS_BILLS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allBillsInGroupReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case GROUP_BILLS_LIST_REQUEST:
      return { loading: true };
    case GROUP_BILLS_LIST_SUCCESS:
      return { loading: false, bills: action.payload };
    case GROUP_BILLS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allUsersInBillReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case BILL_USERS_REQUEST:
      return { loading: true };
    case BILL_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case BILL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const billUpdateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_BILL_REQUEST:
      return { loading: true };
    case UPDATE_BILL_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_BILL_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_BILL_RESET:
      return {};
    default:
      return state;
  }
};

export const settleUpBillUpdateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SETTLE_UP_UPDATE_BILL_REQUEST:
      return { loading: true };
    case SETTLE_UP_UPDATE_BILL_SUCCESS:
      return { loading: false, success: true };
    case SETTLE_UP_UPDATE_BILL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const billDeleteReducer = (state = {}, action: any) => {
  switch (action.type) {
    case DELETE_BILL_REQUEST:
      return { loading: true };
    case DELETE_BILL_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BILL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const billDetailsReducer = (state = { bill: {} }, action: any) => {
  switch (action.type) {
    case BILL_DETAILS_REQUEST:
      return { loading: true };
    case BILL_DETAILS_SUCCESS:
      return { loading: false, bill: action.payload };
    case BILL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const billCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CREATE_BILL_REQUEST:
      return { loading: true };
    case CREATE_BILL_SUCCESS:
      return { loading: false, success: true, bill: action.payload };
    case CREATE_BILL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const billCodeQrUpdateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case UPDATE_CODE_QR_BILL_REQUEST:
      return { loading: true };
    case UPDATE_CODE_QR_BILL_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_CODE_QR_BILL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { loading: true };
    case CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentsListReducer = (state = {}, action: any) => {
  switch (action.type) {
    case COMMENTS_LIST_REQUEST:
      return { loading: true };
    case COMMENTS_LIST_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action: any) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
