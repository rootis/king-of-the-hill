import React, {Component} from "react";
import Questions from "./questions/Questions";
import Button from "../../components/button/Button";
import FormUtils from "../../utils/FormUtils";

export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.loadInfo();
    }

    loadInfo() {
        fetch('/api/participant/' + this.props.params.id, {
            method: "GET"
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            if (response.status >= 400) {
                this.setState({errors: response.json});
            } else {
                this.updateParticipantQuiz(response.json);
            }
        }, function (error) {
            console.log(error);
        });
    }

    handleChange = (event) => {
        let quiz = FormUtils.handleChange(event, this.state.quiz);
        this.setState({quiz: quiz});
    };

    updateParticipantQuiz = (participantQuiz) => {
        this.resetAnswers(participantQuiz.quiz.questions);
        this.setState({
            participant: participantQuiz.participant,
            quiz: participantQuiz.quiz
        });
    };

    resetAnswers(questions) {
        for (let questionKey in questions) {
            if (questions.hasOwnProperty(questionKey)) {
                let question = questions[questionKey];
                for (let answerKey in question.answers) {
                    if (question.answers.hasOwnProperty(answerKey)) {
                        question.answers[answerKey].isCorrect = false;
                    }
                }
            }
        }
    }

    render() {
        let content = <h1>Quiz</h1>;

        if (this.state.quiz) {
            content = (
                <div>
                    <h1>Quiz: {this.state.quiz ? this.state.quiz.title : ''}</h1>
                    <h1>Total
                        score: {this.state.participant && this.state.participant.totalScore ? this.state.participant.totalScore : '0'}</h1>
                    <Questions onChange={this.handleChange} participantId={this.state.participant._id} name="questions" value={this.state.quiz.questions} updateParticipantQuiz={this.updateParticipantQuiz}/>
                </div>
            );
        }

        return (
            <div>
                {content}
                <Button link="/" text="Home Page"/>
            </div>
        );
    }

}
