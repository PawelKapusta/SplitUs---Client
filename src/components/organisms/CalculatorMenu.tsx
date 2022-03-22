import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Flag from "../atoms/Flag";
import { countryCodes, isLower } from "../../utils";

interface Props {
  anchorElement: null | HTMLElement;
  id: string;
  open: boolean;
  onClose: () => void;
  menuItemOnClick: (index: number) => void;
  isLoading: boolean;
  secondIndex: number;
  getCurrencyName: (index: number) => string;
}

const useStyles = makeStyles(() => ({
  currencyName: {
    marginLeft: 10,
    fontSize: 15,
  },
}));

const CalculatorMenu: React.FC<Props> = ({
  anchorElement,
  id,
  open,
  onClose,
  menuItemOnClick,
  isLoading,
  secondIndex,
  getCurrencyName,
  ...restProps
}) => {
  const classes = useStyles();
  const leftCode = countryCodes[secondIndex];
  const leftCountryCodes = countryCodes.filter(code => code !== leftCode);

  return (
    <Menu
      id="menu"
      anchorEl={anchorElement}
      keepMounted
      open={open}
      onClose={onClose}
      {...restProps}>
      {leftCountryCodes.map((code, index) => (
        <MenuItem
          style={{ backgroundColor: "#F5F5F5" }}
          key={code}
          onClick={
            isLower(index, secondIndex)
              ? () => menuItemOnClick(index)
              : () => menuItemOnClick(index + 1)
          }>
          <Flag code={code} />
          {isLoading ? (
            <CircularProgress size={25} />
          ) : (
            <h5 className={classes.currencyName}>
              {isLower(index, secondIndex) ? getCurrencyName(index) : getCurrencyName(index + 1)}
            </h5>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CalculatorMenu;
