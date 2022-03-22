import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import AdminBillsList from "../components/organisms/AdminBillsList";
import { getListBills } from "../store/actions/billsActions";

const AdminBills = () => {
  const dispatch = useDispatch();
  const deletedBill = useSelector((state: RootStateOrAny) => state.deletedBill);
  const { success: deletedBillSuccess } = deletedBill;

  useEffect(() => {
    dispatch(getListBills());
  }, [deletedBillSuccess]);

  return (
    <div>
      <AdminBillsList />
    </div>
  );
};

export default AdminBills;
