import React, {Component} from "react";
import Questions from "./questions/Questions";
import Button from "../../components/button/Button";

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
                this.participant = response.json;
                this.loadQuiz();
            }
        }, function (error) {
            console.log(error);
        });
    }

    loadQuiz() {
        fetch('/api/quiz/' + this.participant.quizCode, {
            method: "GET"
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
    }

    render() {
        let content = <h1>Quiz</h1>;

        if (this.state.quiz) {
            content = (
                <div>
                    <h1>Quiz: {this.state.quiz ? this.state.quiz.title : ''}</h1>
                    <Questions onChange={this.handleChange} name="questions" value={this.state.quiz.questions}/>
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
