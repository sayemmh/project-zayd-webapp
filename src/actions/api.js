import {
  createNextQuestionFR,
  sleep,
  createQuestionsList,
  createAnswerList
} from "../lib/utils";
import { activateButtons, disableButtons } from "./buttons";
import axios from "axios";

export const SET_QUESTIONLIST = "SET_QUESTIONLIST";
export const GAME_STARTED = "GAME_STARTED";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const SET_POINTS = "SET_POINTS";

export const startGame = () => {
  return async dispatch => {
    let qlist;
    let questionList;
    await axios
      .get(`api/questions/levels/1`)
      .then(res => {
          qlist = res.data;
          questionList = createQuestionsList(qlist);

          dispatch(setQuestionList(qlist));
          dispatch(gameStarted(questionList));
      })
      .catch(err => console.log(err));
  };
};

export const levelSelect = (level) => {
  console.log("levelSelect called");
  return async (dispatch) => {
    let qobjs;
    let questionList;
    let answerList;
    console.log(level);
    await axios
      .get(`api/questions/levels/` + level)
      .then((res) => {
        qobjs = res.data;
        
        questionList = createQuestionsList(qobjs);
        // answerList = createAnswerList(qobjs);
        // console.log(questionList)
        // console.log(qlist)
        dispatch(setQuestionList(qobjs))
        // dispatch(gameStarted(answerList));
      })
      .catch((err) => console.log(err));
  };
};

export const surahSelect = (surah) => {
  console.log("surahSelect called");
  return async (dispatch) => {
    let qlist;
    let questionList;
    await axios
      .get(`api/surahs/` + surah)
      .then((res) => {
        qlist = res.data;

        questionList = createQuestionsList(qlist);
        console.log(questionList.length)
        dispatch(setQuestionList(qlist));
        // dispatch(gameStarted(questionList));
      })
      .catch((err) => console.log(err));
  };
};

export const playAudio = (surah) => {
  return async () => {
    await axios
      .get(`https://project-zayd-2000.s3.amazonaws.com/` + surah + ".mp3")
      .then((res) => {
        let aud = new Audio(res.config.url);
        aud.play();
        console.log(surah);
      });
  };
};

export const setQuestionList = qList => ({
  type: SET_QUESTIONLIST,
  payload: qList
});

export const gameStarted = questionList => ({
  type: GAME_STARTED,
  payload: questionList
});

export const nextQuestionCreated = question => ({
  type: NEXT_QUESTION,
  payload: question
});

export const nextQuestion = (delay, points) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.buttons.active) {
      dispatch(disableButtons());
    }

    const {
      currentAnswers,
      qObj
    } = createNextQuestionFR(state.questions_to_ask);

    if (delay) {
      await sleep(delay);
      points = state.feedback.gamePoints + Math.round(points / 2) * 10;
      dispatch(setPoints(points));
    }

    // check NEXT_QUESTION in question reducer
    dispatch(
      nextQuestionCreated({
        currentAnswers,
        qObj
      })
    );

    dispatch(activateButtons());
  };
};

export const setPoints = (points) => ({
  type: SET_POINTS,
  payload: points,
});
