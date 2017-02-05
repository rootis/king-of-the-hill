import React, {Component} from "react";
import Answer from "../answer/Answer";

export default class Answers extends Component {

    handleChange = (event) => {
        this.props.onChange(this.updateEvent(event));
    };

    updateEvent(event) {
        if (event.target.name.indexOf(this.props.name) === -1) {
            event.target.name = this.props.name + '.' + event.target.name;
        }
        return event;
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.value).map((key) =>
                    <Answer key={key} name={key} onChange={this.handleChange} type={this.props.type} value={this.props.value[key]}/>
                )}
            </div>
        );
    }

}
