import React, {Component} from "react";
import TextareaWide from "../../../components/textarea-wide/TextareaWide";
import InputWide from "../../../components/input-wide/InputWide";
import QuestionTypeEnum from "../../../model/common/QuestionTypeEnum";
import AnswerType from "../answer-type/AnswerType";
import Answers from "../answers/Answers";
import RemoveIcon from "../remove.png";
import "./Question.css";

export default class Question extends Component {

    removeQuestion = () => {
        this.props.value.push(this.getNewQuestion());
        this.props.onChange(this.getNewQuestionEvent());
    };

    handleChange = (event) => {
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
                <div className={'CreateQuiz-row-box'}>
                    <div className={'CreateQuiz-row-left-box'}>
                        <span>Remove</span>
                    </div>
                    <div className={'CreateQuiz-row-right-box'}>
                        <img onClick={this.removeQuestion} src={RemoveIcon} alt="Remove Question"/>
                    </div>
                </div>
                <TextareaWide label="Text" placeholder="Question Text" resize={true} onChange={this.handleChange} name="text" value={this.props.value.text}/>
                <InputWide label="Score" placeholder="One second -1 point. 300 points will be 0 after 5 min." onChange={this.handleChange} name="score" value={this.props.value.score}/>
                <div className={'CreateQuiz-row-box'}>
                    <div className={'CreateQuiz-row-left-box'}>
                        <span>Answer Type</span>
                    </div>
                    <div className={'CreateQuiz-row-right-box'}>
                        <AnswerType onChange={this.handleChange} name="type" value={this.props.value.type}/>
                    </div>
                </div>
                <Answers onChange={this.handleChange} name="answers" type={this.props.value.type} value={this.props.value.answers}/>
            </div>
        );
    }

}
