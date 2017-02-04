'use strict';
import JoinQuiz from "../model/forms/JoinQuiz";
import {AbstractValidator} from "./AbstractValidator";
import DatabaseService from "../services/DatabaseService";
import QuizService from "../services/QuizService";

export default class JoinQuizValidator extends AbstractValidator {

    constructor(joinQuiz: JoinQuiz) {
        super(joinQuiz);
    }

    validate(): Promise<boolean> {
        this.validateRequired('quizCode', 'Quiz code is required');
        this.validateParticipantId();

        return new Promise((resolve: (value: boolean) => void, reject: (value: { [key: string]: string }) => void): void => {
            let searchBy: any = {code: this.object['quizCode']};
            DatabaseService.find(QuizService.QUIZ_COLLECTION, searchBy).then((results: any[]) => this.validateExistingQuiz(results, resolve, reject));
        });
    }

    private validateExistingQuiz(results: any[], resolve: (value: boolean) => void, reject: (value: { [key: string]: string }) => void): void {
        if (!results || results.length == 0) {
            this.errors['quizCode'] = 'Incorrect quiz code';
            reject(this.errors);
        }
        this.applyValidationResults(resolve, reject);
    }

    private validateParticipantId(): void {
        this.validateRequired('participantId', 'Participant name is required');
        this.validateTooLong('participantId', 50, 'Participant name is too long');
        this.validateTooShort('participantId', 3, 'Participant name is too short');
    }

}
