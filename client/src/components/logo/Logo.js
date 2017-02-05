import React, {Component} from "react";
import logo from "./logo.png";
import "./Logo.css";

export default class Logo extends Component {

    render() {
        return (
            <div className={'Logo-box' + (this.props.bottomSpacing ? ' Logo-bottom-spacing' : '')}>
                <img src={logo} alt="King of the Hill"/>
            </div>
        );
    }

}
