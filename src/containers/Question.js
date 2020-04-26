import React, { PureComponent } from 'react'
import '../css/Question.css';

import { connect } from 'react-redux'
import { nextQuestion } from '../actions/api'

class Question extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { displayTlit: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.nextQuestion();
  }

  handleClick() {
    this.setState((state) => ({
      displayTlit: !state.displayTlit,
    }));
  }

  render() {
    const { arabicQuestion, correctAnswer, englishTlit } = this.props;

    if (correctAnswer === null) return <h1>Loading</h1>;

    const renderTlit = () => {
      if (this.state.displayTlit) {
        return <div className="tlit">{englishTlit}</div>;
      }
    };

    const renderQuestionButton = () => {
        if (!this.state.displayFeedback) {
          return (
            <div className="question" onClick={this.handleClick}>
              {arabicQuestion}
            </div>
          );
        }
    }

    return (
      <>
        <br></br>
        {renderQuestionButton()}
        {renderTlit()}
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
      arabicQuestion: state.question.arabicQuestion,
      correctAnswer: state.question.correctAnswer,
      englishTlit: state.question.englishTlit,
    };
}

export default connect(mapStateToProps, { nextQuestion })(Question)