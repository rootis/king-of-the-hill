import React, {Component} from "react";

export default class Textarea extends Component {

    render() {
        return (
            <label>
                {this.props.label}:
                <textarea value={this.props.value} name={this.props.name} onChange={this.props.onChange}/>
            </label>
        );
    }

}
