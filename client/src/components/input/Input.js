import React, {Component} from "react";
import "./Input.css";

export default class Input extends Component {

    render() {
        return (
            <label>
                {this.props.label}
                <br />
                {this.props.error ? this.props.error : ''}
                <input type="text" className={this.props.error ? 'Input-error' : ''} onChange={this.props.onChange} name={this.props.name} value={this.props.value}/>
            </label>
        );
    }

}
