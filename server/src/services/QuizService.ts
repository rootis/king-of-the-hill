'use strict';

import Quiz from "../model/entities/Quiz";
import DatabaseService from "./DatabaseService";
import QuizValidator from "../validators/QuizValidator";

export default class QuizService {

    static QUIZ_COLLECTION: string = 'quiz';

    getQuizByCode(code: string): Promise<Quiz> {
        return new Promise<Quiz>(function (resolve: (quiz: Quiz) => void, reject: (value: any) => void) {
            DatabaseService.find(QuizService.QUIZ_COLLECTION, {code: code}).then((results: any[]) => {
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    reject({quizCode: "Quiz not found"});
                }
            }).catch((err) => reject({quizCode: "Quiz not found"}));
        });
    }

    save(quiz: Quiz): Promise<Quiz> {
        this.generateQuizCode(quiz);

        return new Promise<Quiz>((resolve, reject) => {
            this.validateQuiz(quiz).then(() => {
                DatabaseService.insert(QuizService.QUIZ_COLLECTION, quiz).then((quiz: Quiz) => resolve(quiz)).catch((err: any) => reject(err))
            }).catch((err: any) => reject(err));
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
