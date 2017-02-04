import React, {Component} from "react";

export default class Answers extends Component {

    render() {
        return (
            <div>
                {Object.keys(this.props.value).map((key) =>
                    <h1 key={key}>{this.props.value[key].text}</h1>
                )}
            </div>
        );
    }

}
