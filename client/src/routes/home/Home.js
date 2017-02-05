import React, {Component} from "react";
import Logo from "../../components/logo/Logo";
import MainTitle from "./main-title/MainTitle";
import HorizontalLine from "../../components/horizontal-line/HorizontalLine";
import ControllBox from "./controll-box/ControllBox";

export default class HomePage extends Component {

    render() {
        return (
            <div>
                <Logo />
                <MainTitle />
                <HorizontalLine />
                <ControllBox />
            </div>
        );
    }

}
