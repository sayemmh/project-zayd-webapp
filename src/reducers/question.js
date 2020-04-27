import { GAME_STARTED, NEXT_QUESTION } from "../actions/api";
import { createSelection } from '../lib/utils'

const initialState = {
  currentAnswers: null,
  choiceCount: 5,
  qObj: {answer: ""}
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