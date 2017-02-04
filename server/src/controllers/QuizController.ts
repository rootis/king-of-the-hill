'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import Quiz from "../model/entities/Quiz";
import QuizService from "../services/QuizService";
import JoinQuiz from "../model/forms/JoinQuiz";

export default class QuizController {

    private quizService = new QuizService();

    constructor(app: Application) {
        this.registerRoutes(app);
    }

    getQuiz = (request: Request, response: Response): void => {
        let quiz: Quiz = null;

        if (request && request.params && request.params.id) {
            quiz = this.quizService.getQuiz(parseInt(request.params.id));
        }

        response.send(quiz ? quiz : {error: 'Quiz not found'});
    };

    postQuiz = (request: Request, response: Response): void => {
        this.quizService.save(request.body).then((quiz: Quiz) => {
            response.send(quiz);
        }).catch((err) => response.status(500).send(err));
    };

    joinQuiz = (request: Request, response: Response): void => {
        this.quizService.joinQuiz(request.body).then((joinQuiz: JoinQuiz) => {
            response.send(joinQuiz)
        }).catch((err) => response.status(500).send(err));
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = '/api/quiz';

        app.get(urlPrefix + '/:id', this.getQuiz);
        app.post(urlPrefix, this.postQuiz);
        app.post(urlPrefix + '/join', this.joinQuiz);
    }

}
