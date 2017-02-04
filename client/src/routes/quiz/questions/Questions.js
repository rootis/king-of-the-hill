import React, {Component} from "react";
import Question from "../question/Question";

export default class Questions extends Component {

    handleChange = () => {

    };

    render() {
        return (
            <div>
                {Object.keys(this.props.value).map((key) =>
                    <Question key={key} name={key} onChange={this.handleChange} value={this.props.value[key]}/>
                )}
            </div>
        );
    }

}
