'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import Quiz from "../model/entities/Quiz";
import QuizService from "../services/QuizService";

export default class QuizController {

    private quizService = new QuizService();

    constructor(app: Application) {
        this.registerRoutes(app);
    }

    getQuiz = (request: Request, response: Response): void => {
        if (request && request.params && request.params.quizCode) {
            this.quizService.getQuizByCode(request.params.quizCode).then((quiz: Quiz) => {
                response.send(quiz);
            }).catch((err) => response.status(500).send(err));
        } else {
            response.status(500).send({error: 'Participant not found'});
        }
    };

    postQuiz = (request: Request, response: Response): void => {
        this.quizService.save(request.body).then((quiz: Quiz) => {
            response.send(quiz);
        }).catch((err) => response.status(500).send(err));
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = '/api/quiz';

        app.get(urlPrefix + '/:quizCode', this.getQuiz);
        app.post(urlPrefix, this.postQuiz);
    }

}
