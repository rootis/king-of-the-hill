import React, {Component} from "react";
import Logo from "../../components/logo/Logo";
import MainTitle from "./main-title/MainTitle";
import GetStarted from "./get-started/GetStarted";
import ControllBox from "./controll-box/ControllBox";

export default class HomePage extends Component {

    render() {
        return (
            <div>
                <Logo />
                <MainTitle />
                <GetStarted />
                <ControllBox />
            </div>
        );
    }

}
