import React, {Component} from "react";
import Logo from "../logo/Logo";
import MainTitle from "../main-title/MainTitle";
import GetStarted from "../get-started/GetStarted";
import HomePageControlls from "../home-page-controlls/HomePageControlls";
import "./App.css";

export default class App extends Component {

    render() {
        return (
            <div className="App">
                <Logo />
                <MainTitle />
                <GetStarted />
                <HomePageControlls />
            </div>
        );
    }

}
