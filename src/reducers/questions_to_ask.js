import { SET_QUESTIONLIST } from "../actions/api";

export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_QUESTIONLIST:
      return action.payload;

    default:
      return state;
  }
};
