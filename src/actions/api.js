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
      .get(`api/questions/levels/91`)
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
  console.log("levelOne called");
  return async (dispatch) => {
    let qlist;
    let questionList;
    await axios
      .get(`api/questions/levels/90`)
      .then((res) => {
        qlist = res.data;
        questionList = createQuestionsList(qlist);
        dispatch(setQuestionList(qlist));
        // dispatch(gameStarted(questionList));
      })
      .catch((err) => console.log(err));
  };
};

export const levelTwo = () => {
  console.log("levelTwo called");
  return async (dispatch) => {
    let qlist;
    let questionList;
    await axios
      .get(`api/questions/levels/92`)
      .then((res) => {
        qlist = res.data;
        questionList = createQuestionsList(qlist);

        dispatch(setQuestionList(qlist));
        // dispatch(gameStarted(questionList));
      })
      .catch((err) => console.log(err));
  };
};

export const levelSelect = (level) => {
  console.log("levelSelect called");
  return async (dispatch) => {
    let qlist;
    let questionList;
    console.log(level);
    await axios
      .get(`api/questions/levels/` + level)
      .then((res) => {
        qlist = res.data;
        
        questionList = createQuestionsList(qlist);

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

export const nextQuestion = (delay) => {
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
