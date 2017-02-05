import React, {Component} from "react";
import "./MainTitle.css";

export default class MainTitle extends Component {

    render() {
        return (
            <div className="MainTitle-box">
                <div>
                    <span className="MainTitle-bigger">Are you the greatest?</span>
                </div>
                <div className="MainTitle-smaller-title-box">
                    <span className="MainTitle-smaller">Prove it.</span>
                </div>
            </div>
        );
    }

}
