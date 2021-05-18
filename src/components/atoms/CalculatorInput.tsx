import React, { ChangeEvent } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { countryCodes } from "../../utils";
import Flag from "./Flag";

interface Props {
  isLoading: boolean;
  currencyValue: string;
  currencyCode: string;
  index: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    backgroundColor: "#F5F5F5",
    marginBottom: 5,
    [theme.breakpoints.down("sm")]: {},
  },
  inputAdornmentStart: {
    marginRight: 8,
  },
}));

const Input: React.FC<Props> = ({
  isLoading,
  currencyValue,
  currencyCode,
  index,
  onChange,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <OutlinedInput
      className={classes.input}
      type="number"
      startAdornment={
        <InputAdornment className={classes.inputAdornmentStart} position="start">
          <Flag code={countryCodes[index]} />
        </InputAdornment>
      }
      fullWidth
      value={currencyValue}
      endAdornment={
        <InputAdornment position="end">
          {isLoading ? <CircularProgress size={25} /> : <b>{currencyCode}</b>}
        </InputAdornment>
      }
      onChange={onChange}
      {...restProps}
    />
  );
};

export default Input;
