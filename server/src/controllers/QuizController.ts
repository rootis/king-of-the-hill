'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import Quiz from "../entities/Quiz";
import QuizService from "../services/QuizService";

export default class QuizController {

    private quizService = new QuizService();

    constructor(app: Application) {
        this.registerRoutes(app);
    }

    getQuiz = (request: Request, response: Response): void => {
        let quiz: Quiz = null;

        if (request && request.params && request.params.id) {
            let id: number = parseInt(request.params.id);
            quiz = id ? this.quizService.getQuiz(id) : null;
        }

        response.send(quiz ? quiz : {error: 'Quiz not found'});
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = '/api/quiz';

        app.get(urlPrefix + '/:id', this.getQuiz);
    }

}
