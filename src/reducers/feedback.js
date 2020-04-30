import { SET_POINTS, HIDE_FEEDBACK, SHOW_FEEDBACK } from "../actions/feedback";

const initialState = {
    displayFeedback: false,
    gamePoints: 0
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case HIDE_FEEDBACK: {
            return { ...state, displayFeedback: false }
        }

        case SHOW_FEEDBACK: {
            return { ...state, displayFeedback: true }
        }

        case SET_POINTS : {
            // console.log(state)
            return { ...state, gamePoints: action.payload };
        }
    
        default: { 
            return state
        }
    }
}

