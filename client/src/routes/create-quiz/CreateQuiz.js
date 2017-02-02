import React, {Component} from "react";
import Button from "../../components/button/Button";

export default class CreateQuiz extends Component {

    render() {
        return (
            <div>
                <h1>Create</h1>
                <Button link="/" text="Cancel"/>
            </div>
        );
    }

}
