import React, {Component} from "react";
import AnswerEntity from "../../../model/entities/AnswerEntity";
import Answer from "../answer/Answer";
import AddIcon from "../add.png";

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
        result.text = '';
        result.isCorrect = false;
        return result;
    }

    render() {
        return (
            <div>
                <div className={'CreateQuiz-row-box'}>
                    <div className={'CreateQuiz-row-left-box'}>
                        <span>{this.props.error[this.props.questionId + '.' + this.props.name] ? this.props.error[this.props.questionId + '.' + this.props.name] : 'ANSWERS'}</span>
                    </div>
                    <div className={'CreateQuiz-row-right-box'}>
                        <img onClick={this.addAnswer} src={AddIcon} alt="Add Answer"/>
                    </div>
                </div>
                {Object.keys(this.props.value).map((key) =>
                    <Answer key={key} error={this.props.error[this.props.questionId + '.' + this.props.name + '.' + key + '.text']} name={key} onChange={this.handleChange} removeAnswer={this.removeAnswer} type={this.props.type} value={this.props.value[key]}/>
                )}
            </div>
        );
    }

}
