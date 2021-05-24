import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import QuestionsAccordion from "../components/organisms/QuestionsAccordion";
import { listQuestionsFaq } from "../store/actions/questionsFaqActions";

const QuestionsFaqComponent: React.FC = () => {
  const questionsFaqList = useSelector((state: RootStateOrAny) => state.questionsFaqList);
  const { loading, questions } = questionsFaqList;
  const { QuestionsFaq } = questions;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listQuestionsFaq());
  }, []);

  return <QuestionsAccordion loading={loading} QuestionsFaq={QuestionsFaq} />;
};

export default QuestionsFaqComponent;
