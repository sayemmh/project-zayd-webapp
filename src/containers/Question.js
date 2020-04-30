import React, { PureComponent } from 'react'
import '../css/Question.css';
import { connect } from 'react-redux'
import { nextQuestion, playAudio } from '../actions/api'
import { faInfo, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
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

  openQuranDotCom(surah, ayah) {
    window.open(`https://quran.com/${surah}/${ayah}`, "_blank");
  }

  displayInfo() {
    this.setState((state) => ({
      displayInfo: !state.displayInfo,
    }));
  }

  render() {
    const { qObj } = this.props;

    if (qObj === null) return <h1>Loading</h1>;

    const renderTlit = () => {
      if (this.state.displayTlit) {
        return <p className="tlit">{qObj.tlit}</p>;
      }
    };

    const surahayahword = qObj.surahayahnum;

    const renderWordInfo = () => {
      if (this.state.displayInfo) {
        return (
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.displayInfo}
            onHide={this.displayInfo}
            className="info"
          >
            <Modal.Header closeButton>
              <Modal.Title> {qObj.question} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Context: {qObj.arabicAyah} - Quran ({qObj.surahnum}/{qObj.ayahnum}
              )<a> </a>
              <a
                onClick={() =>
                  this.openQuranDotCom(qObj.surahnum, qObj.ayahnum)
                }
                style={{
                  color: "#2169db",
                }}
              >
                Link
              </a>
              <br />
              <br />
              Wazn: {qObj.wazn} <br />
              Part of speech: {qObj.waznType} <br />
              Frequency of this wazn in the Quran: {qObj.waznFreq}
              <br />
              <br />
              Root word: {qObj.rootWord} <br />
              Root word type: {qObj.rootWordType} <br />
              Frequency of this root word in the Quran: {qObj.frequency} <br />
              <br />
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
              <FontAwesomeIcon icon={faVolumeUp} />
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