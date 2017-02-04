import React, {Component} from "react";
import Submit from "../submit/Submit";
import Cancel from "../cancel/Cancel";

export default class Form extends Component {

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                {this.props.children}
                <Submit text={this.props.submitText} />
                <Cancel/>
            </form>
        );
    }

}
