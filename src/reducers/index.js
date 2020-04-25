import { combineReducers } from "redux";
import buttons from "./buttons";
import feedback from "./feedback";
import question from "./question";
import questions_to_ask from "./questions_to_ask";

export default combineReducers({
  buttons,
  feedback,
  question,
  questions_to_ask
});
