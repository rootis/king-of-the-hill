import React, {Component} from "react";
import "./Input.css";

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    render() {
        return (
            <div className={(this.props.floatRight ? ' Input-float-right' : '') + (this.props.floatLeft ? ' Input-float-left' : '')}>
                <label className="Input-label">
                    {this.props.error ? this.props.error : this.props.label}
                </label>
                <input type="text" className={'Input' + (this.props.error ? ' Input-error' : '')} placeholder={this.props.placeholder} onChange={this.props.onChange} name={this.props.name} value={this.state.value}/>
            </div>
        );
    }

}
