import React, {Component} from "react";
import Button from "../../components/button/Button";
import Participants from "./participants/Participants";
import Logo from "../../components/logo/Logo";
import "./Results.css";

export default class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.keepLoadingInformation = true;
        this.loadQuizInfo();
        this.loadInfo();
    }

    componentWillUnmount() {
        this.keepLoadingInformation = false;
    }

    loadQuizInfo = () => {
        fetch('/api/quiz/' + this.props.params.quizCode, {
            method: "GET"
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            if (response.status >= 400) {
                this.setState({errors: response.json});
            } else {
                this.setState({quizTitle: response.json.title});
            }
        }, function (error) {
            console.error(error);
        });
    };

    loadInfo = () => {
        fetch('/api/board/' + this.props.params.quizCode, {
            method: "GET"
        }).then(response => response.json().then(json => ({
                status: response.status,
                json
            })
        )).then((response) => {
            this.setLoadInfoTimeout();
            if (response.status >= 400) {
                this.setState({errors: response.json});
            } else {
                this.updateBoard(response.json);
            }
        }, function (error) {
            console.log(error);
        });
    };

    setLoadInfoTimeout = () => {
        if (this.keepLoadingInformation) {
            setTimeout(this.loadInfo, 5000);
        }
    };

    updateBoard = (board) => {
        this.setState({
            participants: board.participants
        });
    };

    render() {
        return (
            <div className="Results-box">
                <Logo/>
                <div className="Results-title-box">
                    <span className="Results-title">{this.state.quizTitle}</span>
                </div>
                <Participants value={this.state.participants}/>
                <Button link="/" text="Home Page"/>
            </div>
        );
    }

}
