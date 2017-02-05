import React, {Component} from "react";
import {browserHistory} from "react-router";
import ParticipantEntity from "../../model/entities/ParticipantEntity";
import FormUtils from "../../utils/FormUtils";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";

export default class JoinQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participant: new ParticipantEntity(),
            errors: {}
        };
    }

    handleChange = (event) => {
        let participant = FormUtils.handleChange(event, this.state.participant);
        this.setState({participant: participant, errors: {}});
    };

    handleJoin = (event) => {
        event.preventDefault();
        delete this.state.participant.answeredQuestionIds;
        fetch('/api/participant/join', {
            method: "POST",
            body: JSON.stringify(this.state.participant),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            if (response.status >= 400) {
                this.setState({errors: response.json});
            } else {
                browserHistory.push('/quiz/' + response.json._id);
            }
        }, function (error) {
            console.error(error);
        });
    };

    render() {
        return (
            <div>
                <h1>Join</h1>
                <Form onSubmit={this.handleJoin} submitText="Join">
                    <Input label="Your name" error={this.state.errors['participantName']} onChange={this.handleChange} name="participantName" value={this.state.participant.participantName}/>
                    <br/>
                    <Input label="Quiz code" error={this.state.errors['quizCode']} onChange={this.handleChange} name="quizCode" value={this.state.participant.quizCode}/>
                </Form>
            </div>
        );
    }

}
