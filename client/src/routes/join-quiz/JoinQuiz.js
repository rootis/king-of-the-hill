import React, {Component} from "react";
import {browserHistory} from "react-router";
import JoinQuizForm from "../../model/forms/JoinQuizForm";
import FormUtils from "../../utils/FormUtils";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";

export default class JoinQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            joinQuiz: new JoinQuizForm(),
            errors: {}
        };
    }

    handleChange = (event) => {
        let joinQuiz = FormUtils.handleChange(event, this.state.joinQuiz);
        this.setState({joinQuiz: joinQuiz, errors: []});
    };

    handleJoin = (event) => {
        event.preventDefault();
        fetch('/api/quiz/join', {
            method: "POST",
            body: JSON.stringify(this.state.joinQuiz),
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
            console.log(error);
        });
    };

    render() {
        return (
            <div>
                <h1>Join</h1>
                <Form onSubmit={this.handleJoin} submitText="Join">
                    <Input label="Your name" error={this.state.errors['participantId']} onChange={this.handleChange} name="participantId" value={this.state.joinQuiz.participantId}/>
                    <br/>
                    <Input label="Quiz code" error={this.state.errors['quizCode']} onChange={this.handleChange} name="quizCode" value={this.state.joinQuiz.quizCode}/>
                </Form>
            </div>
        );
    }

}
