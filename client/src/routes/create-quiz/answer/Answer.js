import React, {Component} from "react";
import "./Answer.css";
import Input from "../../../components/input/Input";

export default class Answer extends Component {

    handleChange = (event) => {
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name) === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    removeAnswer = (event) => {
        this.props.removeAnswer(this.props.value._id);
    };

    render() {
        return (
            <div className="Answer-box">
                <h1 onClick={this.removeAnswer}>X</h1>
                <Input label="Answer text" onChange={this.handleChange} name="text" value={this.props.value.text}/>
            </div>
        );
    }

}
