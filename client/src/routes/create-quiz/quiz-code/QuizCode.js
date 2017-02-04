import React, {Component} from "react";
import Button from "../../../components/button/Button";

export default class QuizCode extends Component {

    render() {
        return (
            <div>
                <h1>Your quiz code is: {this.props.code}</h1>
                <h3>Please, don't loose it, because there is no way back...</h3>
                <br />
                <Button link="/" text="Home"/>
            </div>
        );
    }

}