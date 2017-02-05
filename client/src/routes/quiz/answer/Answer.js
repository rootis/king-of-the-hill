import React, {Component} from "react";
import QuestionTypeEnum from "../../../model/common/QuestionTypeEnum";
import Checkbox from "../../../components/checkbox/Checkbox";
import Radio from "../../../components/radio/Radio";

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

    render() {
        return (
            <div>
                {this.getCorrectAnswerComponent()}
            </div>
        );
    }

    getCorrectAnswerComponent() {
        if (this.props.type === QuestionTypeEnum.CHECKBOX) {
            return <Checkbox label={this.props.value.text} onChange={this.handleChange} name="isCorrect" value={this.props.value.isCorrect} />;
        } else {
            return <Radio label={this.props.value.text} onChange={this.handleChange} name="isCorrect" value={this.props.value.isCorrect} />
        }
    }

}
