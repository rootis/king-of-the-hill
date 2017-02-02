import React, {Component} from "react";
import Button from "../button/Button";
import "./HomePageControlls.css";

export default class HomePageControlls extends Component {

    render() {
        return (
            <div className="HomePageControlls-box">
                <Button text="Create Quiz"/>
                <Button text="Join Quiz"/>
                <Button text="View Results"/>
            </div>
        );
    }

}