import React, { useState, MouseEvent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { capitalize } from "../../utils";
import Input from "../atoms/CalculatorInput";
import ExchangeCardMenu from "../organisms/CalculatorMenu";

interface Props {
  loading: boolean;
  currencies: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      [theme.breakpoints.down("sm")]: {
        margin: "auto",
        marginTop: theme.spacing(15),
        width: theme.spacing(60),
        height: theme.spacing(65),
      },
      [theme.breakpoints.up("md")]: {
        margin: "auto",
        marginTop: theme.spacing(15),
        width: theme.spacing(80),
        height: theme.spacing(70),
      },
      [theme.breakpoints.up("lg")]: {
        margin: "auto",
        marginTop: theme.spacing(15),
        width: theme.spacing(85),
        height: theme.spacing(80),
      },
    },
  },
  title: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: 35,
      fontSize: 35,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 35,
      fontSize: 40,
    },
  },
  label: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      marginBottom: 1,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 25,
      marginBottom: 2,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 29,
      marginBottom: 3,
    },
  },
  list: {
    width: "100%",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      maxHeight: "40%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(5),
      width: "100%",
      maxWidth: 630,
    },
  },
  listItem: {
    marginBottom: 5,
  },
  button: {
    marginLeft: 15,
  },
  financial: {
    fontSize: 21,
  },
  financialCircularProgress: {
    marginLeft: "0.5rem",
  },
}));

const CalculatorCard: React.FC<Props> = ({ loading, currencies }) => {
  const classes = useStyles();
  const [sendCurrency, setSendCurrency] = useState<string>("");
  const [receiveCurrency, setReceiveCurrency] = useState<string>("");
  const [sendIndex, setSendIndex] = useState<number>(0);
  const [receiveIndex, setReceiveIndex] = useState<number>(1);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [secondAnchorElement, setSecondAnchorElement] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
    setSendCurrency("");
    setReceiveCurrency("");
  };

  const secondHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSecondAnchorElement(event.currentTarget);
  };

  const secondHandleClose = () => {
    setSecondAnchorElement(null);
    setSendCurrency("");
    setReceiveCurrency("");
  };

  const calculateSendCurrency = (value: string) => {
    setReceiveCurrency(value);
    const final = (
      (currencies[receiveIndex]?.mid / currencies[sendIndex]?.mid) *
      Number(value)
    ).toFixed(2);
    setSendCurrency(final);
  };

  const calculateReceiveCurrency = (value: string) => {
    setSendCurrency(value);
    const final = Number(
      (currencies[sendIndex]?.mid / currencies[receiveIndex]?.mid) * Number(value),
    ).toFixed(2);
    setReceiveCurrency(final);
  };

  const getCurrencyName = (index: number) => {
    if (!currencies || currencies.length === 0) {
      return "";
    }

    const endOfCurrencyName = currencies[index].currency.indexOf("(");

    if (endOfCurrencyName === -1) {
      return capitalize(currencies[index].currency);
    }

    return capitalize(currencies[index].currency.substring(0, endOfCurrencyName));
  };

  const getCurrencyCode = (index: number) => {
    if (!currencies || currencies.length === 0) {
      return "";
    }
    return currencies[index].code;
  };

  const calculateCurrencyFactor = () => {
    if (!currencies || currencies.length === 0) {
      return "";
    }
    return (currencies[sendIndex]?.mid / currencies[receiveIndex]?.mid).toFixed(2);
  };

  const sendCurrencyCode = getCurrencyCode(sendIndex);
  const receiveCurrencyCode = getCurrencyCode(receiveIndex);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <h1 className={classes.title}>Currency Converter</h1>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <InputLabel className={classes.label}>You send</InputLabel>
          </ListItem>
          <Button
            className={classes.button}
            aria-controls="simple-menu"
            aria-haspopup="true"
            startIcon={<AttachMoneyIcon />}
            color="primary"
            variant="outlined"
            onClick={handleClick}>
            Choose Currency
          </Button>
          <ExchangeCardMenu
            anchorElement={anchorElement}
            isLoading={loading}
            id="simple-menu"
            onClose={handleClose}
            open={!!anchorElement}
            menuItemOnClick={index => {
              setSendIndex(index);
              handleClose();
            }}
            secondIndex={receiveIndex}
            getCurrencyName={getCurrencyName}
          />
          <ListItem>
            <Input
              currencyValue={sendCurrency}
              currencyCode={sendCurrencyCode}
              isLoading={loading}
              index={Number(sendIndex)}
              onChange={e => calculateReceiveCurrency(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <InputLabel className={classes.label}>They receive</InputLabel>
          </ListItem>
          <Button
            className={classes.button}
            aria-controls="menu"
            aria-haspopup="true"
            startIcon={<AttachMoneyIcon />}
            color="primary"
            variant="outlined"
            onClick={secondHandleClick}>
            Choose Currency
          </Button>
          <ExchangeCardMenu
            anchorElement={secondAnchorElement}
            isLoading={loading}
            id="menu"
            onClose={secondHandleClose}
            open={!!secondAnchorElement}
            menuItemOnClick={index => {
              setReceiveIndex(index);
              secondHandleClose();
            }}
            secondIndex={sendIndex}
            getCurrencyName={getCurrencyName}
          />
          <ListItem>
            <Input
              currencyValue={receiveCurrency}
              currencyCode={receiveCurrencyCode}
              isLoading={loading}
              index={Number(receiveIndex)}
              onChange={e => calculateSendCurrency(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <div className={classes.financial}>
              1 {sendCurrencyCode} =
              {loading ? (
                <CircularProgress size={20} className={classes.financialCircularProgress} />
              ) : (
                <b> {calculateCurrencyFactor()} </b>
              )}
              {receiveCurrencyCode}
            </div>
          </ListItem>
          <ListItem>
            <InputLabel>
              <b>No transfer fee</b>
            </InputLabel>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default CalculatorCard;
