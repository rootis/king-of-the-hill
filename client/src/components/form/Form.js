import React, {Component} from "react";
import Button from "../button/Button";
import HorizontalLine from "../../components/horizontal-line/HorizontalLine";
import "./Form.css";

export default class Form extends Component {

    render() {
        return (
            <form className="Form" onSubmit={this.props.onSubmit}>
                <div className="Form-children-box">
                    {this.props.children}
                </div>
                <HorizontalLine />
                <div className="Form-controlls-box">
                    <Button onClick={this.props.onSubmit} text={this.props.submitText}/>
                    <Button link="/" negative={true} text="Cancel"/>
                </div>
            </form>
        );
    }

}
