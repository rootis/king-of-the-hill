import React, {Component} from "react";
import Button from "../../components/button/Button";

export default class JoinQuiz extends Component {

    render() {
        return (
            <div>
                <h1>Join</h1>
                <Button link="quiz" text="Join Quiz"/>
                <Button link="/" text="Cancel"/>
            </div>
        );
    }

}
