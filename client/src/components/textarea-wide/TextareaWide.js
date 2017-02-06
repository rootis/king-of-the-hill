import React, {Component} from "react";
import "./TextareaWide.css";

export default class TextareaWide extends Component {

    render() {
        return (
            <div className={'TextareaWide-box'}>
                <div className={'TextareaWide-left-box'}>
                    <label className="TextareaWide-label">
                        {this.props.error ? this.props.error : this.props.label}
                    </label>
                </div>
                <div className={'TextareaWide-right-box'}>
                    <textarea className={'TextareaWide' + (this.props.error ? ' TextareaWide-error' : '') + (this.props.resize ? '' : ' TextareaWide-no-resize')} placeholder={this.props.placeholder} name={this.props.name} onChange={this.props.onChange} value={this.props.value} />
                </div>
            </div>
        );
    }

}
