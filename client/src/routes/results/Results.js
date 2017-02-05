import React, {Component} from "react";
import Button from "../../components/button/Button";
import Participants from "./participants/Participants";
import Logo from "../../components/logo/Logo";
import "./Results.css";

export default class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.loadInfo();
    }

    loadInfo = () => {
        fetch('/api/board/' + this.props.params.quizCode, {
            method: "GET"
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            if (response.status >= 400) {
                this.setState({errors: response.json});
            } else {
                this.updateBoard(response.json);
            }
        }, function (error) {
            console.log(error);
        });
    };

    updateBoard = (board) => {
        this.setState({
            participants: board.participants
        });
        setTimeout(this.loadInfo, 5000);
    };

    render() {
        return (
            <div>
                <Logo/>
                <h1>Results {this.state.participants ? this.state.participants.length : 0}</h1>
                <span className="Results-title"></span>
                <Participants value={this.state.participants}/>
                <Button link="/" text="Home Page"/>
            </div>
        );
    }

}
