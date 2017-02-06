import React, {Component} from "react";
import Button from "../../../components/button/Button";
import QuestionTypeEnum from "../../../model/common/QuestionTypeEnum";

export default class AnswerType extends Component {

    selectCheckbox = (event) => {
        if (this.props.value !== QuestionTypeEnum.CHECKBOX) {
            event.target.name = this.props.name;
            event.target.value = QuestionTypeEnum.CHECKBOX;
            this.props.onChange(event);
        }
    };

    selectRadio = (event) => {
        if (this.props.value !== QuestionTypeEnum.RADIO) {
            event.target.name = this.props.name;
            event.target.value = QuestionTypeEnum.RADIO;
            this.props.onChange(event);
        }
    };

    render() {
        return (
            <div className={'AnswerType-box'}>
                <Button text="CHECKBOX" small={true} onClick={this.selectCheckbox} negative={this.props.value !== QuestionTypeEnum.CHECKBOX}/>
                <Button text="RADIO" small={true} onClick={this.selectRadio} negative={this.props.value !== QuestionTypeEnum.RADIO}/>
            </div>
        );
    }

}
