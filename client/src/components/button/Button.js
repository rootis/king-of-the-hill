import React, {Component} from "react";
import {browserHistory} from "react-router";
import "./Button.css";

export default class Button extends Component {

    handleNavigation = (event) => {
        if (this.props.link) {
            browserHistory.push(this.props.link);
        }
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    render() {
        return (
            <span className={'Button' + (this.props.negative ? ' Button-negative' : '') + (this.props.small ? ' Button-small' : '') + (this.props.mid ? ' Button-mid' : '')} onClick={this.handleNavigation}>
                {this.props.text}
            </span>
        );
    }

}