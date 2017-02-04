'use strict';

import Quiz from "../model/entities/Quiz";
import DatabaseService from "./DatabaseService";
import QuizValidator from "../validators/QuizValidator";
import JoinQuiz from "../model/forms/JoinQuiz";
import JoinQuizValidator from "../validators/JoinQuizValidator";

export default class QuizService {

    static QUIZ_COLLECTION: string = 'quiz';
    static QUIZ_PARTICIPANT_COLLECTION: string = 'quiz_participant';

    getQuiz(id: number): Quiz {
        let result: Quiz = new Quiz();
        result.title = 'uga';
        result.prize = 'praiz';

        return result;
    }

    save(quiz: Quiz): Promise<Quiz> {
        this.generateQuizCode(quiz);

        return new Promise<Quiz>((resolve, reject) => {
            this.validateQuiz(quiz).then(() => {
                DatabaseService.insert(QuizService.QUIZ_COLLECTION, quiz).then((quiz: Quiz) => resolve(quiz)).catch((err: any) => reject(err))
            }).catch((err: any) => reject(err));
        });
    }

    joinQuiz(joinQuiz: JoinQuiz): Promise<JoinQuiz> {
        return new Promise<JoinQuiz>((resolve, reject) => {
            this.validateJoinQuiz(joinQuiz).then((result: boolean) => {
                this.isParticipantInQuiz(joinQuiz).then(function (result: JoinQuiz) {
                    if (result) {
                        resolve(result);
                    } else {
                        DatabaseService.insert(QuizService.QUIZ_PARTICIPANT_COLLECTION, joinQuiz).then((joinQuiz: JoinQuiz) => resolve(joinQuiz)).catch((err: any) => reject(err));
                    }
                });
            }).catch((err: any) => reject(err));
        });
    }

    private isParticipantInQuiz(joinQuiz: JoinQuiz): Promise<JoinQuiz> {
        return new Promise<JoinQuiz>(function (resolve) {
            DatabaseService.find(QuizService.QUIZ_PARTICIPANT_COLLECTION, joinQuiz).then((results: any[]) => resolve(results && results.length > 0 ? results[0] : null));
        });
    }

    private validateQuiz(quiz: Quiz): Promise<boolean> {
        let validator: QuizValidator = new QuizValidator(quiz);
        return validator.validate();
    }

    private validateJoinQuiz(joinQuiz: JoinQuiz): Promise<boolean> {
        let validator: JoinQuizValidator = new JoinQuizValidator(joinQuiz);
        return validator.validate();
    }

    private generateQuizCode(quiz: Quiz): void {
        quiz.code = (quiz && quiz.title) ? quiz.title.toLowerCase().split(' ').join('_') : null;
    }

}
