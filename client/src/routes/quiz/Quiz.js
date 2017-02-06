import React, {Component} from "react";
import Questions from "./questions/Questions";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import HorizontalLine from "../../components/horizontal-line/HorizontalLine";
import Constants from "../../common/Constants";
import Utils from "../../utils/Utils";
import "./Quiz.css";

export default class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.loadInfo();
    }

    loadInfo() {
        Utils.ajaxGet(Constants.REST_API_PREFIX + '/participant/' + this.props.params.id).then((result) => {
            this.updateParticipantQuiz(result);
        }).catch((err) => this.setState({errors: err}));
    }

    handleChange = (event) => {
        let quiz = Utils.handleChange(event, this.state.quiz);
        this.setState({quiz: quiz});
    };

    updateParticipantQuiz = (participantQuiz) => {
        this.resetAnswers(participantQuiz.quiz.questions);
        this.setState({
            participant: participantQuiz.participant,
            quiz: participantQuiz.quiz
        });
    };

    updateParticipant = (participant) => {
        this.setState({
            participant: participant
        })
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

    startQuiz = () => {
        Utils.ajaxPost(Constants.REST_API_PREFIX + '/participant/start-quiz', this.state.participant).then((result) => {
            this.updateParticipant(result);
        }).catch((err) => console.error(err));
    };

    render() {
        let quiz;
        let content;
        let startButton;
        let quizStarted = (this.state.participant && this.state.participant.startTimeStamp);

        if (quizStarted) {
            quiz = (
                <Questions onChange={this.handleChange} participantId={this.state.participant._id} name="questions" value={this.state.quiz.questions} updateParticipantQuiz={this.updateParticipantQuiz}/>
            );
            startButton = null;
        } else {
            startButton = (
                <Button onClick={this.startQuiz} text="Start Quiz!"/>
            )
        }

        if (this.state.quiz) {
            content = (
                <div className="Quiz-box">
                    <div className="Quiz-title-box">
                        <span className="Quiz-title">{this.state.quiz ? this.state.quiz.title : ''}</span>
                    </div>
                    <div className="Quiz-title-smaller-box">
                        <span className="Quiz-title-smaller">Total score: {quizStarted ? this.state.participant.totalScore : '0'}</span>
                    </div>
                    {quiz}
                </div>
            );
        }

        return (
            <div>
                <Logo bottomSpacing={!quizStarted}/>
                {content}
                <HorizontalLine smallMargins={quizStarted}/>
                <div className={'Quiz-controlls-box-bottom' + (quizStarted ? '' : ' Quiz-controlls-box')}>
                    {startButton}
                    <Button link="/" negative={true} text="Home Page"/>
                </div>
            </div>
        );
    }

}
