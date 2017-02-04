import React, {Component} from "react";
import Button from "../../components/button/Button";

export default class Quiz extends Component {

    render() {
        return (
            <div>
                <h1>Quiz: {this.props.params.id}</h1>
                <Button link="/" text="Home Page"/>
            </div>
        );
    }

}
