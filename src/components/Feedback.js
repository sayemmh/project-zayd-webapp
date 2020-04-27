import React from 'react'
import { connect } from 'react-redux'
import '../css/button.css'

const Feedback = (props) => {
    if(props.displayFeedback === false) return null 
    if (props.qObj.answer === null || props.qObj.question === null)
      return <h1>Loading</h1>;

    return (
      <div className="feedback">
        {props.qObj.answer}
      </div>
    );
}

const mapStateToProps = (state) => ({
  qObj: state.question.qObj,
  displayFeedback: state.feedback.displayFeedback,
});

export default connect(mapStateToProps)(Feedback)