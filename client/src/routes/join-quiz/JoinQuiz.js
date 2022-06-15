import React, { Component } from "react";
import { browserHistory } from "react-router";
import ParticipantEntity from "../../model/entities/ParticipantEntity";
import Logo from "../../components/logo/Logo";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Constants from "../../common/Constants";
import Utils from "../../utils/Utils";
import "./JoinQuiz.css";

export default class JoinQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: new ParticipantEntity(),
      errors: {},
    };
  }

  handleChange = (event) => {
    let participant = Utils.handleChange(event, this.state.participant);
    this.setState({ participant: participant, errors: {} });
  };

  handleJoin = (event) => {
    event.preventDefault();

    delete this.state.participant.answeredQuestionIds;

    Utils.ajaxPost(
      Constants.REST_API_PREFIX + "/participant/join",
      this.state.participant
    )
      .then((result) => {
        browserHistory.push("/quiz/" + result._id);
      })
      .catch((err) => this.setState({ errors: err }));
  };

  render() {
    return (
      <div>
        <Logo bottomSpacing={true} />
        <Form onSubmit={this.handleJoin} submitText="Join Quiz">
          <div className="JoinQuiz">
            <div>
              <Input
                label="YOUR NAME"
                error={this.state.errors["participantName"]}
                floatLeft={true}
                placeholder="Name or Nickname"
                onChange={this.handleChange}
                name="participantName"
                value={this.state.participant.participantName}
              />
            </div>
            <Input
              label="QUIZ CODE"
              error={this.state.errors["quizCode"]}
              floatRight={true}
              placeholder="Quiz Code"
              onChange={this.handleChange}
              name="quizCode"
              value={this.state.participant.quizCode}
            />
          </div>
        </Form>
      </div>
    );
  }
}
