import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../css/button.css";
import { levelOne, levelTwo } from "../actions/api";
import { connect } from "react-redux";

class TopNavBar extends React.Component {
  changeLevel1 = () => {
    this.props.levelOne();
  };

  changeLevel2 = () => {
    this.props.levelTwo();
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">quranlingo</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="#features">About</Nav.Link>
          <NavDropdown title="Select Level" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={this.changeLevel1}>1</NavDropdown.Item>
            <NavDropdown.Item onClick={this.changeLevel2}>2</NavDropdown.Item>
            <NavDropdown.Item>3</NavDropdown.Item>
          </NavDropdown>
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

export default connect(mapStateToProps, { levelOne, levelTwo })(TopNavBar);