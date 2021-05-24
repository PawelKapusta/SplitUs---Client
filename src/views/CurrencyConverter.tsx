import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CalculatorCard from "../components/templates/CalculatorCard";
import { listCurrencies } from "../store/actions/currencyActions";

const CurrencyConverter: React.FC = () => {
  const currencyList = useSelector((state: RootStateOrAny) => state.currencyList);
  const { loading, currency } = currencyList;
  const { currencies } = currency;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCurrencies());
  }, []);

  return (
    <>
      <CalculatorCard loading={loading} currencies={currencies} />
    </>
  );
};

export default CurrencyConverter;
