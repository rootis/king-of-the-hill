import React, {Component} from "react";
import "./InputWide.css";

export default class InputWide extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    render() {
        return (
            <div className={'InputWide-box'}>
                <div className={'InputWide-left-box'}>
                    <label className="InputWide-label">
                        {this.props.error ? this.props.error : this.props.label}
                    </label>
                </div>
                <div className={'InputWide-right-box'}>
                    <input type="text" className={'InputWide' + (this.props.error ? ' InputWide-error' : '')} placeholder={this.props.placeholder} onChange={this.props.onChange} name={this.props.name} value={this.state.value}/>
                </div>
            </div>
        );
    }

}
