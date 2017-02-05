import React, {Component} from "react";

export default class Participants extends Component {

    render() {
        return (
            <div>
                {this.props.value ? this.props.value.map((participant, index) =>
                    <div key={participant._id}>
                        {index + 1}|{participant.participantName}|{participant.totalScore}
                        <hr/>
                    </div>
                ) : ''}
            </div>
        );
    }

}