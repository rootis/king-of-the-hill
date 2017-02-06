'use strict';

import Quiz from "../model/entities/Quiz";
import DatabaseService from "../services/DatabaseService";
import QuizService from "../services/QuizService";
import {AbstractValidator} from "./AbstractValidator";

export default class QuizValidator extends AbstractValidator {

    constructor(quiz: Quiz) {
        super(quiz);
    }

    validate(): Promise<boolean> {
        this.validateRequired('prize', 'Quiz prize is required');
        this.validateTitle();
        this.validateQuestions();

        return new Promise<boolean>((resolve: (value: boolean) => void, reject: (value: { [key: string]: string }) => void) => {
            let searchBy: any = {code: this.object['code']};
            DatabaseService.find(QuizService.QUIZ_COLLECTION, searchBy).then((results: any[]) => this.validateUniqueness(results, resolve, reject));
        });
    }

    private validateUniqueness(results: any[], resolve: (value: boolean) => void, reject: (value: { [key: string]: string }) => void): void {
        if (results && results.length > 0) {
            this.errors['title'] = 'Quiz title must be unique';
            reject(this.errors);
        }
        this.applyValidationResults(resolve, reject);
    }

    private validateTitle(): void {
        let attribute: string = 'title';

        this.validateRequired(attribute, 'Quiz title is required');
        this.validateTooLong(attribute, 40, 'Quiz title is too long');
        this.validateTooShort(attribute, 4, 'Quiz title is too short');
    }

    private validateQuestions(): void {
        let attribute: string = 'questions';

        this.validateObjectPropertiesRequired(attribute, 'At least one question is required');
    }

}
