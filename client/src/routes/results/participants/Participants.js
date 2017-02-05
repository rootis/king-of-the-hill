import React, {Component} from "react";
import "./Participants.css";

export default class Participants extends Component {

    render() {
        return (
            <div className="Participants-box">
                <table>
                    <thead>
                    <tr>
                        <th>Position</th>
                        <th>Participant Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.value ? this.props.value.map((participant, index) =>
                            <tr key={participant._id}>
                                <td>{index + 1}</td>
                                <td>{participant.participantName}</td>
                                <td>{participant.totalScore}</td>
                            </tr>
                        ) : ''}
                    </tbody>
                </table>
            </div>
        );
    }

}