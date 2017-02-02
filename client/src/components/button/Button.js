import React, {Component} from "react";
import {Link} from "react-router";

export default class Button extends Component {

    render() {
        return (
            <button>
                <Link to={this.props.link}>{this.props.text}</Link>
            </button>
        );
    }

}