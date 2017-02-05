import React, {Component} from "react";

export default class Checkbox extends Component {

    render() {
        return (
            <label>
                <input type="checkbox" onChange={this.props.onChange} name={this.props.name} checked={this.props.value} />
                {this.props.label}
            </label>
        );
    }

}
