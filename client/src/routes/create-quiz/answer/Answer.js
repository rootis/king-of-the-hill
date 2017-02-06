import React, {Component} from "react";
import "./Answer.css";
import Input from "../../../components/input/InputUncontrolled";
import Checkbox from "../../../components/checkbox/Checkbox";
import Radio from "../../../components/radio/Radio";
import RemoveIcon from "../remove.png";
import Constants from "../../../common/Constants";

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
                <div className={'CreateQuiz-row-box'}>
                    <div className={'CreateQuiz-row-left-box'}>
                        <img onClick={this.removeAnswer} src={RemoveIcon} alt="Remove Answer"/>
                    </div>
                    <div className={'CreateQuiz-row-right-box'}>
                        <Input onChange={this.handleChange} placeholder="Answer Text" error={this.props.error} name="text" value={this.props.value.text}/>
                        {this.getCorrectAnswerComponent()}
                    </div>
                </div>
            </div>
        );
    }

    getCorrectAnswerComponent() {
        if (this.props.type === Constants.CHECKBOX) {
            return <Checkbox label="It is correct" onChange={this.handleChange} name="isCorrect" value={this.props.value.isCorrect}/>;
        } else {
            return <Radio label="It is correct" onChange={this.handleChange} name="isCorrect" value={this.props.value.isCorrect}/>;
        }
    }

}
