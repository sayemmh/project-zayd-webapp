import React from 'react'
import { connect } from 'react-redux'
import { nextQuestion } from "../actions/api";
import { showFeedbackScreen } from "../actions/feedback";
import '../css/button.css'

const GREEN = "#18a100"
const RED = "#910303"
const SHORT_DELAY = 250
const WHITE = "white";

class AnswerButton extends React.Component {
    state = {
        textColor: WHITE
    }

    checkAnswer = (event) => {
        if (event.target.innerText === this.props.correctAnswer) {
            
            // need a way to actually remove tashkeel

            // why does component state not set anymore
            this.setState({ textColor: GREEN });
            
            this.props.nextQuestion(SHORT_DELAY, this.props.question.length);
        } else {
            this.setState({ textColor: RED })
            this.props.showFeedbackScreen();
        }
    }

    render() {
        const { option, buttonsActive } = this.props
        return (
            <button 
                disabled={!buttonsActive}
                key={option}
                onClick={this.checkAnswer}
                className="button" 
                style={{ color: this.state.textColor }}
            >
                {option}
            </button>
            )
        }
}

const mapStateToProps = (state) => ({
  buttonsActive: state.buttons.active,
  displayFeedback: state.feedback.displayFeedback,
});

export default connect(mapStateToProps, { 
  nextQuestion,
  showFeedbackScreen,
})(AnswerButton);

