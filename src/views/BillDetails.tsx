import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getDetailsGroup, getListUsersOfGroup } from "../store/actions/groupsActions";

interface Props {
  match: any;
}

const BillDetails: React.FC<Props> = () => {
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //     dispatch(...(match.params.id));
  // }, []);

  return <div>hello in bill details</div>;
};

export default BillDetails;
