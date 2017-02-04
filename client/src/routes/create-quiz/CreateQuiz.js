import React, {Component} from "react";
import CreateQuizForm from "./create-quiz-form/CreateQuizForm";

export default class CreateQuiz extends Component {

    render() {
        return (
            <div>
                <h1>Create</h1>
                <CreateQuizForm/>
            </div>
        );
    }

}
