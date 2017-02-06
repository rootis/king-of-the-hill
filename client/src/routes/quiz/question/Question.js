import React, {Component} from "react";
import "./Question.css";
import QuestionTypeEnum from "../../../model/common/QuestionTypeEnum";
import Answers from "../answers/Answers";
import QuestionAnswer from "../../../model/forms/QuestionAnswer";
import Button from "../../../components/button/Button";

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

    submitAnswer = () => {
        fetch('/api/participant/answer', {
            method: "POST",
            body: JSON.stringify(this.getAnswer()),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            if (response.status >= 400) {
                // error
            } else {
                this.props.updateParticipantQuiz(response.json);
            }
        }, function (error) {
            console.log(error);
        });
    };

    getAnswer() {
        let result = new QuestionAnswer();

        result.questionId = this.props.value._id;
        result.participantId = this.props.participantId;
        result.answerIds = this.getAnswerIds(this.props.value.answers);

        return result;
    }

    getAnswerIds(answers) {
        let result = [];

        for (let key in answers) {
            if (answers[key].isCorrect) {
                result.push(answers[key]._id);
            }
        }

        return result;
    }

    render() {
        return (
            <div className="Question-box">
                <div className="QuizQuestion-row-box">
                    <div className="QuizQuestion-row-left-box">
                        <span>Score</span>
                    </div>
                    <div className="QuizQuestion-row-right-box">
                        <span>{this.props.value.score}</span>
                    </div>
                </div>
                <div className="QuizQuestion-text-box">
                    <p><strong>Question: </strong>{this.props.value.text}</p>

                </div>
                <Answers value={this.props.value.answers} name="answers" onChange={this.handleChange} type={this.props.value.type}/>
                <Button onClick={this.submitAnswer} text="Submit Answer" mid={true}/>
            </div>
        );
    }

}
