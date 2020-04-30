import { sleep } from '../lib/utils'
import { nextQuestion } from './api'
import { disableButtons } from './buttons'

export const SHOW_FEEDBACK = 'SHOW_FEEDBACK'
export const HIDE_FEEDBACK = 'HIDE_FEEDBACK'
export const SET_POINTS = "SET_POINTS";

const PAUSE_BEFORE_SHOWING_FEEDBACK = 500

export const showFeedback = () => ({
  type: SHOW_FEEDBACK
})

export const hideFeedback = () => ({
  type: HIDE_FEEDBACK,
});

export const showFeedbackScreen = () => {
    return async (dispatch, getState) => {
        dispatch(disableButtons())
        // popup saying incorrect!
        await sleep(PAUSE_BEFORE_SHOWING_FEEDBACK)
        dispatch(showFeedback())
        // await sleep(FOUR_SECONDS)
        // dispatch(hideFeedback())
        // nextQuestion()(dispatch, getState)
    }
}

export const moveOnFromFeedback = () => {
  return async (dispatch, getState) => {
    dispatch(hideFeedback())
    nextQuestion()(dispatch, getState)
  };
};

