import { GAME_STARTED, NEXT_QUESTION } from "../actions/api";
import { createSelection } from '../lib/utils'

const initialState = {
  currentAnswers: null,
  choiceCount: 5,
  // there has to be a better way to handle this
  qObj: {answer: "", surahnum:"", ayahnum:"", wordnum:""}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
      case GAME_STARTED: {
        const { currentAnswers } = createSelection(
          action.payload,
          state.choiceCount
        );
        return { ...state, currentAnswers };
      }

      case NEXT_QUESTION: {
        const {
          currentAnswers,
          qObj,
        } = action.payload;
        return {
          ...state,
          currentAnswers,
          qObj
        };
      }

      default: {
        return state;
      }
    }
}