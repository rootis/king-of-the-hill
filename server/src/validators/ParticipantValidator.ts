'use strict';

import {AbstractValidator} from "./AbstractValidator";
import DatabaseService from "../services/DatabaseService";
import QuizService from "../services/QuizService";
import Participant from "../model/entities/Participant";

export default class ParticipantValidator extends AbstractValidator {

    constructor(participant: Participant) {
        super(participant);
    }

    validate(): Promise<boolean> {
        this.validateRequired('quizCode', 'Quiz code is required');
        this.validateParticipantName();

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

    private validateParticipantName(): void {
        this.validateRequired('participantName', 'Participant name is required');
        this.validateTooLong('participantName', 50, 'Participant name is too long');
        this.validateTooShort('participantName', 3, 'Participant name is too short');
    }

};
