import {
  GROUPS_LIST_SUCCESS,
  GROUPS_LIST_REQUEST,
  GROUPS_LIST_FAIL,
  USERGROUPS_LIST_REQUEST,
  USERGROUPS_LIST_FAIL,
  USERGROUPS_LIST_SUCCESS,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_SUCCESS,
  GROUP_DETAILS_FAIL,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAIL,
} from "../../constants/groupsConstants";
import {
  GET_USERSOFGROUP_REQUEST,
  GET_USERSOFGROUP_SUCCESS,
  GET_USERSOFGROUP_FAIL,
} from "../../constants/groupsUsersConstants";
import http from "../../lib/axios";

export const getListGroups = () => async (dispatch: any, getState: any) => {
  dispatch({ type: GROUPS_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get("/groups", {
      headers: {
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    });
    dispatch({ type: GROUPS_LIST_SUCCESS, payload: data?.groups });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: GROUPS_LIST_FAIL, payload: message });
  }
};

export const getListGroupsOfUser = () => async (dispatch: any, getState: any) => {
  dispatch({ type: USERGROUPS_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/groupsUsers/user/${userInfo?.data?.ID}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    dispatch({ type: USERGROUPS_LIST_SUCCESS, payload: data.response });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USERGROUPS_LIST_FAIL, payload: message });
  }
};

export const getDetailsGroup = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: GROUP_DETAILS_REQUEST, payload: id });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    });
    console.log("single group data", data.group);
    dispatch({ type: GROUP_DETAILS_SUCCESS, payload: data.group });
  } catch (error) {
    dispatch({
      type: GROUP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getListUsersOfGroup = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: GET_USERSOFGROUP_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.get(`/groupsUsers/group/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.data.token}`,
      },
    });
    dispatch({ type: GET_USERSOFGROUP_SUCCESS, payload: data.response });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: GET_USERSOFGROUP_FAIL, payload: message });
  }
};

export const createGroup = (
  Name: string,
  Description: string,
  DataCreated: string,
  usersIdArray: string[],
) => async (dispatch: any, getState: any) => {
  dispatch({ type: CREATE_GROUP_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await http.post(
      `/groups`,
      {
        Name,
        Description,
        DataCreated,
        usersIdArray,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
      },
    );
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CREATE_GROUP_FAIL, payload: message });
  }
};

export const deleteGroup = (id: string) => async (dispatch: any, getState: any) => {
  dispatch({ type: DELETE_GROUP_REQUEST, payload: id });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.delete(`/groups/${id}`, {
      headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
    });
    dispatch({ type: DELETE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: DELETE_GROUP_FAIL, payload: message });
  }
};

export const updateGroup = (
  id: string,
  Name: string,
  Description: string,
  DataCreated: string,
) => async (dispatch: any, getState: any) => {
  dispatch({ type: UPDATE_GROUP_REQUEST, payload: { Name, Description, DataCreated } });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await http.put(
      `/groups/${id}`,
      { Name, Description, DataCreated },
      {
        headers: { Authorization: `Bearer ${userInfo?.data?.token}` },
      },
    );
    dispatch({ type: UPDATE_GROUP_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: UPDATE_GROUP_FAIL, error: message });
  }
};
