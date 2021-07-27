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
  CREATE_BILL_FAIL,
  CREATE_BILL_REQUEST,
  CREATE_BILL_SUCCESS,
  DELETE_BILL_FAIL,
  DELETE_BILL_REQUEST,
  DELETE_BILL_SUCCESS,
  GROUP_BILLS_LIST_FAIL,
  GROUP_BILLS_LIST_REQUEST,
  GROUP_BILLS_LIST_SUCCESS,
  OWNERS_BILLS_LIST_FAIL,
  OWNERS_BILLS_LIST_REQUEST,
  OWNERS_BILLS_LIST_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_REQUEST,
  UPDATE_BILL_SUCCESS,
  UPDATE_CODE_QR_BILL_FAIL,
  UPDATE_CODE_QR_BILL_REQUEST,
  UPDATE_CODE_QR_BILL_SUCCESS,
  SETTLE_UP_UPDATE_BILL_REQUEST,
  SETTLE_UP_UPDATE_BILL_SUCCESS,
  SETTLE_UP_UPDATE_BILL_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_SUCCESS,
  COMMENTS_LIST_FAIL,
  COMMENTS_LIST_REQUEST,
  COMMENTS_LIST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
} from "../../constants/billsConstants";
import http from "../../lib/axios";

export const getListBills = () => async (dispatch: any, getState: any) => {
  dispatch({ type: BILLS_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get("/bills", {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    dispatch({ type: BILLS_LIST_SUCCESS, payload: data?.bills });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BILLS_LIST_FAIL, payload: message });
  }
};

export const getAllBillsInGroup = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: GROUP_BILLS_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/bills/group/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    console.log("bills data", data);
    dispatch({ type: GROUP_BILLS_LIST_SUCCESS, payload: data?.bills });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: GROUP_BILLS_LIST_FAIL, payload: message });
  }
};

export const settleUpBillUser = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({
    type: SETTLE_UP_UPDATE_BILL_REQUEST,
  });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.put(
      `/usersBills/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
      },
    );
    dispatch({ type: SETTLE_UP_UPDATE_BILL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: SETTLE_UP_UPDATE_BILL_FAIL, error: message });
  }
};

export const getAllUsersInBill = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: BILL_USERS_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/usersBills/bill/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    console.log("users bill data", data);
    dispatch({ type: BILL_USERS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BILL_USERS_FAIL, payload: message });
  }
};

export const getOwnerBillsList = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: OWNERS_BILLS_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/bills/owner/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    console.log("bills data", data);
    dispatch({ type: OWNERS_BILLS_LIST_SUCCESS, payload: data?.bills });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: OWNERS_BILLS_LIST_FAIL, payload: message });
  }
};

export const updateBill = (
  id: string,
  Name: string,
  Description: string,
  DataCreated: string,
  DataEnd: string,
) => async (dispatch: any, getState: any) => {
  dispatch({
    type: UPDATE_BILL_REQUEST,
    payload: { Name, Description, DataCreated, DataEnd },
  });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.put(
      `/bills/owner/${id}`,
      { Name, Description, DataCreated, DataEnd },
      {
        headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
      },
    );
    dispatch({ type: UPDATE_BILL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: UPDATE_BILL_FAIL, error: message });
  }
};

export const deleteBill = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: DELETE_BILL_REQUEST, payload: id });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.delete(`/bills/${id}`, {
      headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
    });
    dispatch({ type: DELETE_BILL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: DELETE_BILL_FAIL, payload: message });
  }
};

export const createBill = (
  Name: string,
  Description: string,
  DataCreated: string,
  DataEnd: string,
  BillImage: string,
  CurrencyCode: string,
  Debt: number,
  OwnerId: string,
  CodeQR: string,
  GroupId: string,
  usersBillsArray: { id: string; value: number }[],
  isRegulated: boolean,
) => async (dispatch: any, getState: any) => {
  dispatch({ type: CREATE_BILL_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.post(
      `/bills`,
      {
        Name,
        Description,
        DataCreated,
        DataEnd,
        BillImage,
        CurrencyCode,
        Debt,
        OwnerId,
        CodeQR,
        GroupId,
        usersBillsArray,
        isRegulated,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
      },
    );
    dispatch({ type: CREATE_BILL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CREATE_BILL_FAIL, payload: message });
  }
};

export const getDetailsBill = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: BILL_DETAILS_REQUEST, payload: id });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/bills/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    console.log("single bill data", data.bill);
    dispatch({ type: BILL_DETAILS_SUCCESS, payload: data.bill });
  } catch (error) {
    dispatch({
      type: BILL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateCodeQrValueInBill = (id: string, urlValue: string) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({ type: UPDATE_CODE_QR_BILL_REQUEST, payload: { urlValue } });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.put(
      `/bills/${id}/codeQr`,
      { urlValue },
      {
        headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
      },
    );
    console.log("update data", data);
    dispatch({ type: UPDATE_CODE_QR_BILL_SUCCESS, payload: data });
  } catch (e) {
    const message = e.response && e.response.data.message ? e.response.data.message : e.message;
    dispatch({ type: UPDATE_CODE_QR_BILL_FAIL, error: message });
  }
};

export const createComment = (BillId: string, UserId: string, Content: string) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.post(
      `/comments`,
      { BillId, UserId, Content },
      {
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
      },
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CREATE_COMMENT_FAIL, payload: message });
  }
};

export const getListCommentsInBill = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: COMMENTS_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    dispatch({ type: COMMENTS_LIST_SUCCESS, payload: data?.comments });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: COMMENTS_LIST_FAIL, payload: message });
  }
};

export const deleteComment = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: DELETE_COMMENT_REQUEST, payload: id });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.delete(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
    });
    dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: DELETE_COMMENT_FAIL, payload: message });
  }
};
