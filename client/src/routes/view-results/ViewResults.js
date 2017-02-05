import React, {Component} from "react";
import {browserHistory} from "react-router";
import FormUtils from "../../utils/FormUtils";
import Logo from "../../components/logo/Logo";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import "./ViewResults.css";

export default class ViewResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputForm: {},
            errors: {}
        };
    }

    handleChange = (event) => {
        let inputForm = FormUtils.handleChange(event, this.state.inputForm);
        this.setState({inputForm: inputForm, errors: {}});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/quiz/' + this.state.inputForm.quizCode, {
            method: "GET"
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            if (response.status >= 400) {
                this.setState({errors: response.json});
            } else {
                browserHistory.push('/results/' + response.json.code);
            }
        }, function (error) {
            console.error(error);
        });
    };

    render() {
        return (
            <div>
                <Logo bottomSpacing={true}/>
                <Form onSubmit={this.handleSubmit} submitText="View Results">
                    <div className="ViewResults">
                        <Input label="QUIZ CODE" error={this.state.errors['quizCode']} onChange={this.handleChange} name="quizCode" value={this.state.inputForm.quizCode}/>
                    </div>
                </Form>
            </div>
        );
    }

}
