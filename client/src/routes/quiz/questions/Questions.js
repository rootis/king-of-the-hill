import React, {Component} from "react";
import Question from "../question/Question";

export default class Questions extends Component {

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
                    <Question key={key} name={key} participantId={this.props.participantId} onChange={this.handleChange} value={this.props.value[key]} updateParticipantQuiz={this.props.updateParticipantQuiz}/>
                )}
            </div>
        );
    }

}
