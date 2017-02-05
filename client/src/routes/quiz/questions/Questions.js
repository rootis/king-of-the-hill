import React, {Component} from "react";
import Question from "../question/Question";

export default class Questions extends Component {

    constructor(props) {
        super(props);
        this.startTimer();
    }

    handleChange = (event) => {
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name) === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    startTimer() {
        setInterval(this.decreaseQuestionScore, 1000);
    }

    decreaseQuestionScore = () => {
        let questions = this.props.value;
        for (let questionId in questions) {
            if (questions.hasOwnProperty(questionId) && questions[questionId].score) {
                questions[questionId].score = parseInt(questions[questionId].score, 10) - 1;
            }
        }
        this.props.onChange(this.createUpdateEvent())
    };

    createUpdateEvent() {
        return {
            target: {
                name: this.props.name,
                value: this.props.value
            }
        };
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.value).map((key) =>
                    <Question key={key} name={key} participantId={this.props.participantId} onChange={this.handleChange} value={this.props.value[key]} updateParticipantQuiz={this.props.updateParticipantQuiz}/>
                )}
            </div>
        );
    }

}
