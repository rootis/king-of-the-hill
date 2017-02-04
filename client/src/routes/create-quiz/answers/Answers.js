import React, {Component} from "react";
import AnswerEntity from "../../../model/entities/AnswerEntity";
import Answer from "../answer/Answer";

export default class Answers extends Component {

    constructor(props) {
        super(props);
        this.lastId = 0;
    }

    addAnswer = () => {
        let answer = this.getNewAnswer();
        this.props.value[answer._id] = answer;
        this.props.onChange(this.createUpdateEvent());
    };

    createUpdateEvent() {
        return {
            target: {
                name: this.props.name,
                value: this.props.value
            }
        };
    }

    handleChange = (event) => {
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name) === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    removeAnswer = (answerId) => {
        delete this.props.value[answerId];
        this.props.onChange(this.createUpdateEvent());
    };

    getNewAnswer() {
        this.lastId++;
        let result = new AnswerEntity();
        result._id = this.lastId.toString() + 'a';
        result.text = 'Answa: ' + result._id;
        return result;
    }

    render() {
        return (
            <div>
                <h1 onClick={this.addAnswer}>Answers. Click to add</h1>
                {Object.keys(this.props.value).map((key) =>
                    <Answer key={key} name={key} onChange={this.handleChange} removeAnswer={this.removeAnswer} value={this.props.value[key]}/>
                )}
            </div>
        );
    }

}
