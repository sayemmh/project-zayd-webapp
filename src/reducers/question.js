import { GAME_STARTED, NEXT_QUESTION } from "../actions/api";
import { createSelection } from '../lib/utils'

const initialState = {
  arabicQuestion: null,
  currentAnswers: null,
  correctAnswer: null,
  choiceCount: 5,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case GAME_STARTED: {
            const { currentAnswers } = createSelection(action.payload, state.choiceCount)
            return { ...state, currentAnswers }
        }
        case NEXT_QUESTION: {
            const {
              currentAnswers,
              correctAnswer,
              arabicQuestion,
              englishTlit,
            } = action.payload;
            return {
              ...state,
              currentAnswers,
              correctAnswer,
              arabicQuestion,
              englishTlit,
            };
        }

        default: {
            return state
        }
    }
}