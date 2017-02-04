import React, {Component} from "react";
import "./Question.css";
import Textarea from "../../../components/textarea/Textarea";
import Input from "../../../components/input/Input";
import QuestionTypeEnum from "../../../model/common/QuestionTypeEnum";
import Answers from "../answers/Answers";

export default class Question extends Component {

    removeQuestion = () => {
        this.props.value.push(this.getNewQuestion());
        this.props.onChange(this.getNewQuestionEvent());
    };

    handleChange = (event) => {
        console.log(event.target.name);
        if (event.target.name.indexOf('isCorrect') > -1) {
            this.checkCorrectAnswersByQuestionType();
        }
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name + '.') === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    checkCorrectAnswersByQuestionType() {
        if (this.props.value.type === QuestionTypeEnum.RADIO) {
            Object.keys(this.props.value.answers).forEach((key) => this.props.value.answers[key].isCorrect = false);
        }
    }

    removeQuestion = (event) => {
        this.props.removeQuestion(this.props.value._id);
    };

    render() {
        return (
            <div className="Question-box">
                <h1 onClick={this.removeQuestion}>X</h1>
                <Textarea label="Question" onChange={this.handleChange} name="text" value={this.props.value.text}/>
                <br/>
                <Input label="Score" onChange={this.handleChange} name="score" value={this.props.value.score}/>
                <br/>
                <select value={this.props.value.type} name="type" onChange={this.handleChange}>
                    <option value={QuestionTypeEnum.CHECKBOX}>Checkbox</option>
                    <option value={QuestionTypeEnum.RADIO}>Radio button</option>
                </select>
                <Answers onChange={this.handleChange} name="answers" type={this.props.value.type} value={this.props.value.answers}/>
            </div>
        );
    }

}
