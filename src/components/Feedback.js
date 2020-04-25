import React from 'react'
import { connect } from 'react-redux'
import '../css/Feedback.css'
import '../css/button.css'

const Feedback = (props) => {
    if(props.displayFeedback === false) return null 
    if (props.correctAnswer === null || props.arabicQuestion === null)
      return <h1>Loading</h1>;

    return (
      <div className="abcd">
        <div className="abcd">
          <h1>
            <strong>{props.arabicQuestion}</strong>
          </h1>
          <div className="feedback">{props.correctAnswer}</div>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  correctAnswer: state.question.correctAnswer,
  arabicQuestion: state.question.arabicQuestion,
  displayFeedback: state.feedback.displayFeedback,
});

export default connect(mapStateToProps)(Feedback)