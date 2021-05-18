import React from "react";
import ReactCountryFlag from "react-country-flag";

const Flag = ({ code }) => (
  <ReactCountryFlag
    countryCode={code}
    svg
    style={{
      width: "2.5em",
      height: "2.5em",
      paddingRight: "0.75rem",
    }}
    title={code}
  />
);

export default Flag;
