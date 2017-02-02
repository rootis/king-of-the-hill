import React, {Component} from "react";
import logo from "./logo.svg";
import "./Logo.css";

export default class Logo extends Component {

    render() {
        return (
            <img src={logo} className="Logo" alt="King of the Hill"/>
        );
    }

}
