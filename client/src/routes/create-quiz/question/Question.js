import React, {Component} from "react";
import "./Question.css";
import Textarea from "../../../components/textarea/Textarea";
import Answers from "../answers/Answers";

export default class Question extends Component {

    removeQuestion = () => {
        this.props.value.push(this.getNewQuestion());
        this.props.onChange(this.getNewQuestionEvent());
    };

    handleChange = (event) => {
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name + '.') === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    removeQuestion = (event) => {
        this.props.removeQuestion(this.props.value._id);
    };

    render() {
        return (
            <div className="Question-box">
                <h1 onClick={this.removeQuestion}>X</h1>
                <Textarea label="Question" onChange={this.handleChange} name="text" value={this.props.value.text}/>
                <Answers onChange={this.handleChange} name="answers" value={this.props.value.answers}/>
            </div>
        );
    }

}
