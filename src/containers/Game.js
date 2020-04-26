import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { startGame } from "../actions/api";
import Question from "./Question";
import AnswerButton from "./AnswerButton";
import Feedback from "../components/Feedback";
import { moveOnFromFeedback } from "../actions/feedback";
import { Button } from "react-bootstrap";

class Game extends PureComponent {
  state = {
    loaded: false,
  };
  componentDidMount() {
    // this.props.startGame();
    this.setState({ loaded: true });
  }

  checkAnswer2 = () => {
    this.props.moveOnFromFeedback();
  };

  render() {
    // console.log(this.state.loaded)
    const { questions_to_ask, correctAnswer, options, feedback } = this.props;
    if (questions_to_ask.length === 0 || options === null)
      return <h1>Select A Level</h1>;

    const renderQuestion = () => {
      if (!feedback) {
        return <Question />;
      }
    };

    const renderAnswers = () => {
      if (!feedback) {
        return options.map((option) => (
          <AnswerButton
            key={`${option}-${Math.random()}`}
            option={option}
            correctAnswer={correctAnswer}
          />
        ));
      }
    };

    const continueButton = () => {
      if (feedback) {
        return (
          <Button variant="dark" onClick={this.checkAnswer2}>
            {"Continue"}
          </Button>
        );
      }
    };

    return (
      <>
        {renderQuestion()}
        {renderAnswers()}
        <Feedback />
        {continueButton()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions_to_ask: state.questions_to_ask,
    options: state.question.currentAnswers,
    correctAnswer: state.question.correctAnswer,
    feedback: state.feedback.displayFeedback
  };
};

export default connect(mapStateToProps, { startGame, moveOnFromFeedback })(
  Game
);
