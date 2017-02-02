'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import QuizController from "./controllers/QuizController";

const path = require('path');
const express = require('express');

const app: Application = express();
const publicClientDir: string = '../public';

app.use(express.static(publicClientDir));

new QuizController(app);

app.get('*', function (request: Request, response: Response) {
    response.sendFile(path.resolve(publicClientDir, 'index.html'));
});

app.listen(8000);
