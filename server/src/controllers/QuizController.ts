'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import {AbstractController} from "./AbstractController";
import QuizService from "../services/QuizService";
import Quiz from "../model/entities/Quiz";
import Constants from "../common/Constants";

export default class QuizController extends AbstractController {

    private quizService = new QuizService();

    constructor(app: Application) {
        super();
        this.registerRoutes(app);
    }

    registerRoutes(app: Application): void {
        let urlPrefix: string = Constants.REST_API_URL_PREFIX + '/quiz';

        app.get(urlPrefix + '/:quizCode', this.getQuiz);
        app.post(urlPrefix, this.postQuiz);
    }

    getQuiz = (request: Request, response: Response): void => {
        if (request && request.params && request.params.quizCode) {
            this.quizService.getQuizByCode(request.params.quizCode).then((quiz: Quiz) => {
                response.send(quiz);
            }).catch((err) => this.sendErrors(response, err));
        } else {
            response.status(400).send({quizCode: 'Quiz not found'});
        }
    };

    postQuiz = (request: Request, response: Response): void => {
        this.quizService.save(request.body).then((quiz: Quiz) => {
            response.send(quiz);
        }).catch((err) => this.sendErrors(response, err));
    };

}
