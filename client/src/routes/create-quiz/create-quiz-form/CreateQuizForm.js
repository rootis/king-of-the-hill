import React, {Component} from "react";
import QuizForm from "../../../model/forms/QuizForm";
import QuizCode from "../quiz-code/QuizCode";
import Form from "../../../components/form/Form";
import HorizontalLine from "../../../components/horizontal-line/HorizontalLine";
import InputWide from "../../../components/input-wide/InputWide";
import Textarea from "../../../components/textarea/Textarea";
import Questions from "../questions/Questions";
import FormUtils from "../../../utils/FormUtils";

export default class CreationForm extends Component {

    constructor(props) {
        super(props);

        this.lastId = 0;
        this.state = {
            quiz: new QuizForm(),
            errors: {}
        };
    }

    handleChange = (event) => {
        let quiz = FormUtils.handleChange(event, this.state.quiz);
        this.setState({quiz: quiz, errors: []});
    };

    handleSave = (event) => {
        event.preventDefault();
        fetch('/api/quiz', {
            method: "POST",
            body: JSON.stringify(this.state.quiz),
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
                this.setState({quiz: response.json});
            }
        }, function (error) {
            console.log(error);
        });
    };

    render() {
        let content = null;

        if (this.state.quiz.code) {
            content = <QuizCode code={this.state.quiz.code}/>;
        } else {
            content = (
                <Form onSubmit={this.handleSave} submitText="Create">
                    <HorizontalLine smallMargins={true}/>
                    <InputWide label="QUIZ TITLE" error={this.state.errors['title']} placeholder="Unique Quiz Title" onChange={this.handleChange} name="title" value={this.state.quiz.title}/>
                    <br/>
                    <br/>
                    <Textarea label="Prize" onChange={this.handleChange} name="prize" value={this.state.quiz.prize}></Textarea>
                    <br/>
                    <Questions onChange={this.handleChange} name="questions" value={this.state.quiz.questions}/>
                </Form>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }

}
