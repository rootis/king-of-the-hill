import React, {Component} from "react";
import Button from "../../../components/button/Button";
import "./ControllBox.css";

export default class HomePageControlls extends Component {

    render() {
        return (
            <div className="HomePageControlls-box">
                <Button link="create-quiz" text="Create Quiz"/>
                <Button link="join-quiz" text="Join Quiz"/>
                <Button link="view-results" text="View Results"/>
            </div>
        );
    }

}