import React, {Component} from "react";
import Button from "../../components/button/Button";

export default class ViewResults extends Component {

    render() {
        return (
            <div>
                <h1>View</h1>
                <Button link="results" text="View Results"/>
                <Button link="/" text="Cancel"/>
            </div>
        );
    }

}
