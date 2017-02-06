import React, {Component} from "react";
import "./Input.css";

export default class InputUncontrolled extends Component {

    render() {
        return (
            <input type="text" className={'Input Input-uncontrolled ' + (this.props.error ? ' Input-error' : '')} onChange={this.props.onChange} name={this.props.name} value={this.props.value}/>
        );
    }

}
