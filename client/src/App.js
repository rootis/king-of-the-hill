import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    handleClick = () => {
        fetch('/getdata')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    data: response.someString
                });
            });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 onClick={this.handleClick}>{this.state.data ? this.state.data : "Welcome to React"}</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }

}

export default App;
