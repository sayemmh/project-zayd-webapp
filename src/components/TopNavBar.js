import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../css/button.css";
import { nextQuestion, levelSelect, surahSelect } from "../actions/api";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";

class TopNavBar extends React.Component {
  state = {
    curLevel: 1,
    curSurah: ""
  }
  
  changeLevel = (level) => {
    this.props.levelSelect(level);
    this.setState({ curLevel: level, curSurah: "" });
    // need to fix this -- this is grabbing another question from the same level, async this function
    this.props.nextQuestion();
  };

  changeSurah = (surah) => {
    this.props.surahSelect(surah);
    this.setState({ curLevel: "", curSurah: surah });
    // need to fix this -- this is grabbing another question from the same level, async this function
    this.props.nextQuestion();
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
              {[...Array(100).keys()].map((level) => (
                <NavDropdown.Item
                  key={`key-${level}`}
                  onClick={() => this.changeLevel(level)}
                >
                  {level}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              title={`Surah ${this.state.curSurah}`}
              id="collasible-nav-dropdown"
            >
              {[...Array(114).keys()].map((surah) => (
                <NavDropdown.Item
                  key={`surah-${surah}`}
                  onClick={() => this.changeSurah(surah)}
                >
                  {surah}
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

export default connect(mapStateToProps, { nextQuestion, levelSelect, surahSelect })(TopNavBar);