import React, { forwardRef, Ref, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core";
import QuestionsAccordion from "../components/organisms/QuestionsAccordion";
import { listQuestionsFaq } from "../store/actions/questionsFaqActions";
import Button from "../components/atoms/Button";
import QuestionFaqCreator from "../components/organisms/QuestionFaqCreator";

/* eslint-disable */
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/* eslint-enable */

const useStyles = makeStyles({
  noQuestionsInfo: {
    marginLeft: 55,
    fontSize: "2em",
    fontWeight: "bold",
    color: "red",
  },
});

const QuestionsFaqComponent: React.FC = () => {
  const questionsFaqList = useSelector((state: RootStateOrAny) => state.questionsFaqList);
  const { loading, questions } = questionsFaqList;
  const questionFaqCreated = useSelector((state: RootStateOrAny) => state.questionFaqCreated);
  const { success } = questionFaqCreated;
  const { QuestionsFaq } = questions;
  const userSignIn = useSelector((state: RootStateOrAny) => state.userSignIn);
  const { userInfo } = userSignIn;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listQuestionsFaq());
  }, [success]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateClick = () => {
    setOpen(true);
  };

  return (
    <div>
      {userInfo?.data?.isAdmin ? (
        <Button onClick={handleCreateClick} type="create_faqQuestion_btn" text="Create question" />
      ) : (
        ""
      )}
      {QuestionsFaq?.length !== 0 ? (
        <QuestionsAccordion loading={loading} QuestionsFaq={QuestionsFaq} />
      ) : (
        <span className={classes.noQuestionsInfo}>No questions</span>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <QuestionFaqCreator />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionsFaqComponent;
