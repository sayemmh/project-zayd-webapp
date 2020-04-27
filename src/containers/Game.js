import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { startGame } from "../actions/api";
import Question from "./Question";
import AnswerButton from "./AnswerButton";
import Feedback from "../components/Feedback";
import { moveOnFromFeedback } from "../actions/feedback";
import { ProgressBar, Button } from "react-bootstrap";
import '../css/Question.css';

class Game extends PureComponent {
  state = {
    loaded: false,
  };
  componentDidMount() {
    this.props.startGame();
    this.setState({ loaded: true });
  }

  continue = () => {
    this.props.moveOnFromFeedback();
  };

  render() {
    const { questions_to_ask, correctAnswer, options, feedback } = this.props;
    if (questions_to_ask.length === 0 || options === null)
      return <div className="prompt">Select A Level</div>;

    const renderQuestion = () => {
      return <Question />;
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
          <Button variant="dark" className="tlit" onClick={this.continue}>
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
        <div className="progressBar">
          <ProgressBar variant="success" now={40} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions_to_ask: state.questions_to_ask,
    options: state.question.currentAnswers,
    correctAnswer: state.question.qObj.answer,
    feedback: state.feedback.displayFeedback
  };
};

export default connect(mapStateToProps, { startGame, moveOnFromFeedback })(
  Game
);
