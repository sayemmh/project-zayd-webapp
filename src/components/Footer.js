import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../css/button.css";
import { connect } from "react-redux";

class Footer extends React.Component {
  changeLevel1 = () => {
    this.props.levelOne();
  };

  changeLevel2 = () => {
    this.props.levelTwo();
  };

  render() {
    return (
      <Navbar className="navbar" bg="light" variant="light">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="#features">About</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions_to_ask: state.questions_to_ask,
    options: state.question.currentAnswers,
    correctAnswer: state.question.correctAnswer,
    feedback: state.feedback.displayFeedback,
  };
};

export default connect(mapStateToProps)(Footer);