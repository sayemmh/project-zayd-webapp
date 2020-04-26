import {
  createNextQuestionFR,
  sleep,
  createQuestionsList,
} from "../lib/utils";
import { activateButtons, disableButtons } from "./buttons";
import axios from "axios";

export const SET_QUESTIONLIST = "SET_QUESTIONLIST";
export const GAME_STARTED = "GAME_STARTED";
export const NEXT_QUESTION = "NEXT_QUESTION";

export const startGame = () => {
  return async dispatch => {
    let qlist;
    let questionList;
    await axios
      .get(`api/questions/levels/2`)
      .then(res => {
          qlist = res.data;
          questionList = createQuestionsList(qlist);
          dispatch(setQuestionList(qlist));
          dispatch(gameStarted(questionList));
      })
      .catch(err => console.log(err));
  };
};

export const levelOne = () => {
  return async (dispatch) => {
    let qlist;
    let questionList;
    await axios
      .get(`api/questions/levels/1`)
      .then((res) => {
        qlist = res.data;
        questionList = createQuestionsList(qlist);
        dispatch(setQuestionList(qlist));
        dispatch(gameStarted(questionList));
      })
      .catch((err) => console.log(err));
  };
};

export const levelTwo = () => {
  console.log("we here");
  return async (dispatch) => {
    let qlist;
    let questionList;
    await axios
      .get(`api/questions/levels/2`)
      .then((res) => {
        qlist = res.data;
        questionList = createQuestionsList(qlist);
        dispatch(setQuestionList(qlist));
        dispatch(gameStarted(questionList));
      })
      .catch((err) => console.log(err));
  };
};

export const setQuestionList = qList => ({
  type: SET_QUESTIONLIST,
  payload: qList
});

export const gameStarted = breedList => ({
  type: GAME_STARTED,
  payload: breedList
});

export const nextQuestionCreated = question => ({
  type: NEXT_QUESTION,
  payload: question
});

export const nextQuestion = delay => {
  return async (dispatch, getState) => {
    const state = getState();

    if (state.buttons.active) {
      dispatch(disableButtons());
    }

    // const { currentAnswers, correctAnswer } = createNextQuestion(
    //   state.question.currentAnswers
    // );

    const {
      currentAnswers,
      correctAnswer,
      arabicQuestion,
      englishTlit
    } = createNextQuestionFR(state.questions_to_ask);


    if (delay) {
      await sleep(delay);
    }

    dispatch(
      nextQuestionCreated({
        currentAnswers,
        correctAnswer,
        arabicQuestion,
        englishTlit,
      })
    );
    dispatch(activateButtons());
  };
};
