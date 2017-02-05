import React, {Component} from "react";
import {browserHistory} from "react-router";
import "./Button.css";

export default class Button extends Component {

    handleNavigation = () => {
        if (this.props.link) {
            browserHistory.push(this.props.link);
        }
    };

    render() {
        return (
            <span className="Button" onClick={this.handleNavigation}>
                {this.props.text}
            </span>
        );
    }

}