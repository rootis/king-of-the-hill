'use strict';

import {AbstractService} from "./AbstractService";
import DatabaseService from "./DatabaseService";
import QuizValidator from "../validators/QuizValidator";
import Quiz from "../model/entities/Quiz";
import Constants from "../common/Constants";

export default class QuizService extends AbstractService {

    getQuizByCode(code: string): Promise<Quiz> {
        return new Promise<Quiz>((resolve: (quiz: Quiz) => void, reject: (value: any) => void) => {
            DatabaseService.find(Constants.QUIZ_COLLECTION, {code: code}).then((results: any[]) => {
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    this.validationReject(reject, {quizCode: "Quiz not found"});
                }
            }).catch((err) => this.validationReject(reject, err));
        });
    }

    save(quiz: Quiz): Promise<Quiz> {
        this.generateQuizCode(quiz);

        return new Promise<Quiz>((resolve: (quiz: Quiz) => void, reject: (value: any) => void) => {
            this.validateQuiz(quiz).then(() => {
                DatabaseService.insert(Constants.QUIZ_COLLECTION, quiz).then((quiz: Quiz) => {
                    resolve(quiz);
                }).catch((err: any) => reject(err));
            }).catch((err: any) => this.validationReject(reject, err));
        });
    }

    private validateQuiz(quiz: Quiz): Promise<boolean> {
        let validator: QuizValidator = new QuizValidator(quiz);

        return validator.validate();
    }

    private generateQuizCode(quiz: Quiz): void {
        quiz.code = (quiz && quiz.title) ? quiz.title.toLowerCase().split(' ').join('_') : null;
    }

}
