import React, { PureComponent } from 'react'
import '../css/Question.css';
import { connect } from 'react-redux'
import { nextQuestion } from '../actions/api'
import { faInfo } from "@fortawesome/free-solid-svg-icons";
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
    console.log(this.state.displayTlit);
    this.setState((state) => ({
      displayTlit: !state.displayTlit,
    }));
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

    // const renderGrammar = () => {
    //   if (this.state.displayInfo) {
    //     return (
    //       <Modal.Dialog>
    //         <Modal.Header closeButton>
    //           <Modal.Title>Modal title</Modal.Title>
    //         </Modal.Header>

    //         <Modal.Body>
    //           <p>Modal body text goes here.</p>
    //         </Modal.Body>

    //         <Modal.Footer>
    //           <Button variant="secondary">Close</Button>
    //           <Button variant="primary">Save changes</Button>
    //         </Modal.Footer>
    //       </Modal.Dialog>
    //     );
    //   }
    // };

    const renderGrammar = () => {
      if (this.state.displayInfo) {
        return (
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.displayInfo}
            onHide={this.displayInfo}
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
            <Modal.Footer>
              <Button variant="secondary" onClick={this.displayInfo}>
                Close
              </Button>
            </Modal.Footer>
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
        {renderGrammar()}
      </>
    );
  }
}

const mapStateToProps = state => {
    return {
      qObj: state.question.qObj
    };
}

export default connect(mapStateToProps, { nextQuestion })(Question)