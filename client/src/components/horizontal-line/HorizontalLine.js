import React, {Component} from "react";
import "./HorizontalLine.css";

export default class HorizontalLine extends Component {

    render() {
        return (
            <hr className={'HorizontalLine' + (this.props.smallMargins ? ' HorizontalLine-small-margins' : ' HorizontalLine-margins')}/>
        );
    }

}