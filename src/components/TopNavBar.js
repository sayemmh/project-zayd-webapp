import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../css/button.css";
import { levelSelect } from "../actions/api";
import { connect } from "react-redux";

class TopNavBar extends React.Component {
  state = {
    curLevel: 1
  }

  changeLevel = (level) => {
    this.props.levelSelect(level);
    this.setState({ curLevel: level });
  };

  render() {
    return (
      <>
        <Navbar className="navbar" bg="light" variant="light">
          <Nav className="navbar">quranlingo</Nav>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <NavDropdown
              title={`Level ${this.state.curLevel}`}
              id="collasible-nav-dropdown"
            >
              {[...Array(25).keys()].map((level) => (
                <NavDropdown.Item
                  key={`key-${level}`}
                  onClick={() => this.changeLevel(level)}
                >
                  {level}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar>
      </>
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

export default connect(mapStateToProps, { levelSelect })(
  TopNavBar
);