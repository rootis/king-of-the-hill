import React, {Component} from "react";

export default class Radio extends Component {

    render() {
        return (
            <label>
                <input type="radio" onChange={this.props.onChange} name={this.props.name} value={true} checked={this.props.value} />
                {this.props.label}
            </label>
        );
    }

}
