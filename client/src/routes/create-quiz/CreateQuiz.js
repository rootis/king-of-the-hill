import React, {Component} from "react";
import CreateQuizForm from "./create-quiz-form/CreateQuizForm";
import Logo from "../../components/logo/Logo";
import "./CreateQuiz.css";

export default class CreateQuiz extends Component {

    render() {
        return (
            <div>
                <Logo />
                <div className="CreateQuiz-box">
                    <CreateQuizForm/>
                </div>
            </div>
        );
    }

}
