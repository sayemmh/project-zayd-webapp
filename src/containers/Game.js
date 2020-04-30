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
    const { question, questions_to_ask, correctAnswer, options, feedback, points } = this.props;
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
            question={question}
            correctAnswer={correctAnswer}
          />
        ));
      }
    };

    const renderPoints = () => {
      return <div className="points"> Points: {points} </div>;
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
        {renderPoints()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions_to_ask: state.questions_to_ask,
    question: state.question.qObj.question,
    options: state.question.currentAnswers,
    correctAnswer: state.question.qObj.answer,
    feedback: state.feedback.displayFeedback,
    points: state.feedback.gamePoints
  };
};

export default connect(mapStateToProps, { startGame, moveOnFromFeedback })(
  Game
);
