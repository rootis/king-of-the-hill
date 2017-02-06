'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import QuizController from "./controllers/QuizController";
import ParticipantController from "./controllers/ParticipantController";
import BoardController from "./controllers/BoardController";
import Constants from "./common/Constants";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());
app.use(express.static(Constants.PUBLIC_DIR));

new QuizController(app);
new ParticipantController(app);
new BoardController(app);

app.get('*', function (request: Request, response: Response) {
    response.sendFile(path.resolve(Constants.PUBLIC_DIR, 'index.html'));
});

app.listen(Constants.SERVER_PORT);
