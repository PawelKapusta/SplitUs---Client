import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootStateOrAny, useSelector } from "react-redux";
import Button from "../atoms/Button";

interface Props {
  loading: boolean;
  QuestionsFaq: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",

      [theme.breakpoints.down("sm")]: {
        marginTop: "20%",
        width: "90%",
        paddingBottom: theme.spacing(10),
      },
      [theme.breakpoints.up("md")]: {
        width: "70%",
        marginTop: "7%",
        paddingBottom: theme.spacing(15),
      },
      [theme.breakpoints.up("lg")]: {
        width: "60%",
        marginTop: "7%",
        paddingBottom: theme.spacing(15),
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: "bold",
    },
    answer: {
      fontSize: theme.typography.pxToRem(17),
    },
  }),
);

const QuestionsAccordion: React.FC<Props> = ({ loading, QuestionsFaq }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        QuestionsFaq?.map((element: any, index: number) => {
          return (
            <>
              <Accordion key={element.ID}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}a-content`}
                  id={`panel${index + 1}a-header`}>
                  <Typography className={classes.heading}>{element.Question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.answer}>{element.Answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })
      )}
    </div>
  );
};

export default QuestionsAccordion;
