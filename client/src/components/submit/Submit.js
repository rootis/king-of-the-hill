import React, {Component} from "react";

export default class Submit extends Component {

    render() {
        return (
            <input type="submit" value={this.props.text ? this.props.text : 'Submit'}/>
        );
    }

}