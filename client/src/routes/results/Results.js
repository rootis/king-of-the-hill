import React, {Component} from "react";
import Button from "../../components/button/Button";
import Participants from "./participants/Participants";
import Logo from "../../components/logo/Logo";
import Constants from "../../common/Constants";
import Utils from "../../utils/Utils";
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
        Utils.ajaxGet(Constants.REST_API_PREFIX + '/quiz/' + this.props.params.quizCode).then((result) => {
            this.setState({
                quizTitle: result.title,
                prize: result.prize
            });
        }).catch((err) => this.setState({errors: err}));
    };

    loadInfo = () => {
        Utils.ajaxGet(Constants.REST_API_PREFIX + '/board/' + this.props.params.quizCode).then((result) => {
            this.updateBoard(result);
        }).catch((err) => this.setState({errors: err}));
    };

    setLoadInfoTimeout = () => {
        if (this.keepLoadingInformation) {
            setTimeout(this.loadInfo, Constants.BOARD_LOAD_INTERVAL);
        }
    };

    updateBoard = (board) => {
        this.setLoadInfoTimeout();
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
                <div className="Results-title-smaller-box">
                    <span className="Results-title-smaller"><strong>Prize</strong>: {this.state.prize}</span>
                </div>
                <Participants value={this.state.participants}/>
                <Button link="/" text="Home Page"/>
            </div>
        );
    }

}
