'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import QuizController from "./controllers/QuizController";
import ParticipantController from "./controllers/ParticipantController";
import BoardController from "./controllers/BoardController";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app: Application = express();
const publicClientDir: string = '../public';

app.use(bodyParser.json());
app.use(express.static(publicClientDir));

new QuizController(app);
new ParticipantController(app);
new BoardController(app);

app.get('*', function (request: Request, response: Response) {
    response.sendFile(path.resolve(publicClientDir, 'index.html'));
});

app.listen(8000);
