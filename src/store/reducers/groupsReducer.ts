import {
  GROUPS_LIST_SUCCESS,
  GROUPS_LIST_REQUEST,
  GROUPS_LIST_FAIL,
  USERGROUPS_LIST_SUCCESS,
  USERGROUPS_LIST_FAIL,
  USERGROUPS_LIST_REQUEST,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_SUCCESS,
  GROUP_DETAILS_FAIL,
} from "../../constants/groupsConstants";
import {
  ADD_GROUPUSERS_FAIL,
  ADD_GROUPUSERS_REQUEST,
  ADD_GROUPUSERS_SUCCESS,
  GET_USERSOFGROUP_FAIL,
  GET_USERSOFGROUP_REQUEST,
  GET_USERSOFGROUP_SUCCESS,
} from "../../constants/groupsUsersConstants";

export const groupsListReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case GROUPS_LIST_REQUEST:
      return { loading: true };
    case GROUPS_LIST_SUCCESS:
      return { loading: false, groups: action.payload };
    case GROUPS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userGroupsListReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case USERGROUPS_LIST_REQUEST:
      return { loading: true };
    case USERGROUPS_LIST_SUCCESS:
      return { loading: false, groups: action.payload };
    case USERGROUPS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersOfGroupReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case GET_USERSOFGROUP_REQUEST:
      return { loadingUsersOfGroup: true };
    case GET_USERSOFGROUP_SUCCESS:
      return { loadingUsersOfGroup: false, usersOfGroupList: action.payload };
    case GET_USERSOFGROUP_FAIL:
      return { loadingUsersOfGroup: false, error: action.payload };
    default:
      return state;
  }
};

export const groupDetailsReducer = (state = { group: {} }, action: any) => {
  switch (action.type) {
    case GROUP_DETAILS_REQUEST:
      return { loading: true };
    case GROUP_DETAILS_SUCCESS:
      return { loading: false, group: action.payload };
    case GROUP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addUsersToGroupReducer = (state = {}, action: any) => {
  switch (action.type) {
    case ADD_GROUPUSERS_REQUEST:
      return { loadingAdd: true };
    case ADD_GROUPUSERS_SUCCESS:
      return { loadingAdd: false, successAdd: true, groupUsers: action.payload };
    case ADD_GROUPUSERS_FAIL:
      return { loadingAdd: false, error: action.payload };
    default:
      return state;
  }
};

export const groupCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case CREATE_GROUP_REQUEST:
      return { loadingCreate: true };
    case CREATE_GROUP_SUCCESS:
      return { loadingCreate: false, successCreate: true, newGroup: action.payload };
    case CREATE_GROUP_FAIL:
      return { loadingCreate: false, error: action.payload };
    default:
      return state;
  }
};
