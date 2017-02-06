import React, {Component} from "react";
import QuizForm from "../../../model/forms/QuizForm";
import QuizCode from "../quiz-code/QuizCode";
import Form from "../../../components/form/Form";
import HorizontalLine from "../../../components/horizontal-line/HorizontalLine";
import InputWide from "../../../components/input-wide/InputWide";
import TextareaWide from "../../../components/textarea-wide/TextareaWide";
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
        let filteredErrors = this.filterErrors(event.target.name);

        this.setState({quiz: quiz, errors: filteredErrors});
    };

    filterErrors(name) {
        if (this.state.errors[name]) {
            delete this.state.errors[name];
        } else if (name.indexOf('.') > -1) {
            delete this.state.errors[name.substr(name.indexOf('.') + 1)];
        }

        return this.state.errors;
    }

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
                <Form onSubmit={this.handleSave} submitText="Create" midMargins={true}>
                    <HorizontalLine smallMargins={true}/>
                    <InputWide label="QUIZ TITLE" error={this.state.errors['title']} placeholder="Unique Quiz Title" onChange={this.handleChange} name="title" value={this.state.quiz.title}/>
                    <TextareaWide label="PRIZE" error={this.state.errors['prize']} onChange={this.handleChange} placeholder="Prize for the King" name="prize" value={this.state.quiz.prize}></TextareaWide>
                    <HorizontalLine midMargins={true}/>
                    <Questions error={this.state.errors} onChange={this.handleChange} name="questions" value={this.state.quiz.questions}/>
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
