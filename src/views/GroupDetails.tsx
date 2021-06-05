import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getDetailsGroup, getListUsersOfGroup } from "../store/actions/groupsActions";

interface Props {
  match: any;
}

const GroupDetails: React.FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const groupDetails = useSelector((state: RootStateOrAny) => state.groupDetails);
  const { group, loading: loadingGroup } = groupDetails;

  useEffect(() => {
    dispatch(getDetailsGroup(match.params.id));
  }, []);

  return <div>{group?.ID}</div>;
};

export default GroupDetails;
