'use strict';

import {AbstractValidator} from "./AbstractValidator";
import DatabaseService from "../services/DatabaseService";
import QuizService from "../services/QuizService";
import Quiz from "../model/entities/Quiz";
import Question from "../model/entities/Question";
import Answer from "../model/entities/Answer";

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

        if (this.validateObjectPropertiesRequired(attribute, 'At least one question is required')) {
            for (let key in this.object.questions) {
                if (this.object.questions.hasOwnProperty(key)) {
                    this.validateQuestion(this.object.questions[key]);
                }
            }
        }
    }

    private validateQuestion(question: Question): void {
        let errorKeyPrefix: string = question._id + '.';

        this.validateRequiredPassingObject(question, 'text', errorKeyPrefix, 'Text is required');
        if (this.validateRequiredPassingObject(question, 'score', errorKeyPrefix, 'Score is required')) {
            this.validateNumberPassingObject(question, 'score', errorKeyPrefix, 'Score should be a number');
        }
        this.validateAnswers(question);
    }

    private validateAnswers(question: Question): void {
        let errorKeyPrefix: string = question._id + '.';

        if (this.validateObjectPropertiesRequiredPassingObject(question, 'answers', errorKeyPrefix, 'At least one answer is required')) {
            for (let key in question.answers) {
                if (question.answers.hasOwnProperty(key)) {
                    this.validateAnswer(question.answers[key], errorKeyPrefix);
                }
            }
        }
    }

    private validateAnswer(answer: Answer, keyPrefix: string): void {
        let errorKeyPrefix: string = keyPrefix + 'answers' + '.' + answer._id + '.';

        this.validateRequiredPassingObject(answer, 'text', errorKeyPrefix, 'Text is required');
    }

}
