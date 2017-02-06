import React, {Component} from "react";
import {browserHistory} from "react-router";
import Logo from "../../components/logo/Logo";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import Constants from "../../common/Constants";
import Utils from "../../utils/Utils";
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
        let inputForm = Utils.handleChange(event, this.state.inputForm);
        this.setState({inputForm: inputForm, errors: {}});
    };

    handleSubmit = (event) => {
        event.preventDefault();

        Utils.ajaxGet(Constants.REST_API_PREFIX + '/quiz/' + this.state.inputForm.quizCode).then((result) => {
            browserHistory.push('/results/' + result.code);
        }).catch((err) => this.setState({errors: err}));
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
