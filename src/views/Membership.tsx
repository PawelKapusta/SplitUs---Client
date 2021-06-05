import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import UserGroupsList from "../components/organisms/UserGroupsList";
import { getListGroupsOfUser } from "../store/actions/groupsActions";
import { listUsers } from "../store/actions/userActions";

const Membership: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch(getListGroupsOfUser());
  }, []);

  return (
    <div>
      <UserGroupsList />
    </div>
  );
};

export default Membership;
