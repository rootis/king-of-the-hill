import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import App from "./App";
import Home from "./routes/home/Home";
import CreateQuiz from "./routes/create-quiz/CreateQuiz";
import JoinQuiz from "./routes/join-quiz/JoinQuiz";
import Quiz from "./routes/quiz/Quiz";
import ViewResults from "./routes/view-results/ViewResults";
import Results from "./routes/results/Results";

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/create-quiz" component={CreateQuiz} />
            <Route path="/join-quiz" component={JoinQuiz} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/view-results" component={ViewResults} />
            <Route path="/results/:quizCode" component={Results} />
            <Route path='*' component={Home} />
        </Route>
    </Router>,
    document.getElementById('root')
);
