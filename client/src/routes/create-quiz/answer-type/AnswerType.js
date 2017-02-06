import React, {Component} from "react";
import Button from "../../../components/button/Button";
import Constants from "../../../common/Constants";

export default class AnswerType extends Component {

    selectCheckbox = (event) => {
        if (this.props.value !== Constants.CHECKBOX) {
            event.target.name = this.props.name;
            event.target.value = Constants.CHECKBOX;
            this.props.onChange(event);
        }
    };

    selectRadio = (event) => {
        if (this.props.value !== Constants.RADIO) {
            event.target.name = this.props.name;
            event.target.value = Constants.RADIO;
            this.props.onChange(event);
        }
    };

    render() {
        return (
            <div className={'AnswerType-box'}>
                <Button text="CHECKBOX" small={true} onClick={this.selectCheckbox} negative={this.props.value !== Constants.CHECKBOX}/>
                <Button text="RADIO" small={true} onClick={this.selectRadio} negative={this.props.value !== Constants.RADIO}/>
            </div>
        );
    }

}
