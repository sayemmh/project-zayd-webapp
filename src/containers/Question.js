import React, { PureComponent } from 'react'
import '../css/Question.css';
import { connect } from 'react-redux'
import { nextQuestion, playAudio } from '../actions/api'
import { faInfo, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";

class Question extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { displayTlit: false, displayInfo: false };
    this.handleClick = this.handleClick.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
  }

  componentDidMount() {
    this.props.nextQuestion();
  }

  handleClick() {
    this.setState((state) => ({
      displayTlit: !state.displayTlit,
    }));
  }

  displayInfo() {
    this.setState((state) => ({
      displayInfo: !state.displayInfo,
    }));
  }

  append0s(input) {
    input = input.toString()
    if (input.length === 1) {
      return '00' + input
    } else if (input.length === 2) {
      return '0' + input
    }
  }

  render() {
    const { qObj } = this.props;

    if (qObj === null) return <h1>Loading</h1>;

    const renderTlit = () => {
      if (this.state.displayTlit) {
        return <p className="tlit">{qObj.tlit}</p>;
      }
    };

    // remove this nonsense
    // include this in data so i don't calculate this here
    const surahayahword = qObj.surahayahnum


    const renderWordInfo = () => {
      if (this.state.displayInfo) {
        return (
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.displayInfo}
            onHide={this.displayInfo}
            className="tlit"
          >
            <Modal.Header closeButton>
              <Modal.Title> {qObj.question} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Root word: {qObj.rootWord} <br />
              Root word type: {qObj.rootWordType} <br />
              Word frequency in Quran: {qObj.frequency} <br />
              Example: {qObj.arabicAyah} <br />
            </Modal.Body>
          </Modal>
        );
      }
    };

    const renderQuestionButton = () => {
      if (!this.state.displayFeedback) {
        return (
          <div>
            <Button
              style={{
                backgroundColor: "#c9c9c9",
                borderColor: "#c9c9c9",
                color: "#303030",
                borderRadius: "10px",
              }}
              className="soundButton"
              onClick={() => this.props.playAudio(surahayahword)}
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
            <Button
              style={{
                backgroundColor: "#c9c9c9",
                borderColor: "#c9c9c9",
                color: "#303030",
                borderRadius: "10px",
              }}
              className="infoButton"
              onClick={this.displayInfo}
            >
              <FontAwesomeIcon icon={faInfo} />
            </Button>
            <p className="question" onClick={this.handleClick}>
              {qObj.question}
            </p>
          </div>
        );
      }
    };

    return (
      <>
        <br></br>
        {renderQuestionButton()}
        {renderTlit()}
        {renderWordInfo()}
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
      qObj: state.question.qObj
    };
}

export default connect(mapStateToProps, { nextQuestion, playAudio })(Question);