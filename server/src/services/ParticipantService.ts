'use strict';

import {AbstractService} from "./AbstractService";
import DatabaseService from "./DatabaseService";
import QuizService from "./QuizService";
import ParticipantValidator from "../validators/ParticipantValidator";
import Quiz from "../model/entities/Quiz";
import Question from "../model/entities/Question";
import QuestionAnswer from "../model/forms/QuestionAnswer";
import Participant from "../model/entities/Participant";
import ParticipantQuiz from "../model/forms/ParticipantQuiz";
import Utils from "../utils/Utils";
import Constants from "../common/Constants";

export default class ParticipantService extends AbstractService {

    private quizService: QuizService = new QuizService();

    validateAndCreateOrLoad(participant: Participant): Promise<Participant> {
        return new Promise<Participant>((resolve: (value: Participant) => void, reject: (value: any) => void) => {
            this.validateParticipant(participant).then(() => {
                this.isParticipantInQuiz(participant).then((result: Participant) => {
                    if (result) {
                        resolve(result);
                    } else {
                        participant.totalScore = 0;
                        DatabaseService.insert(Constants.PARTICIPANT_COLLECTION, participant).then((result: Participant) => {
                            resolve(result);
                        }).catch((err: any) => reject(err));
                    }
                }).catch((err: any) => reject(err));
            }).catch((err: any) => this.validationReject(reject, err));
        });
    }

    getParticipant(id: string): Promise<Participant> {
        return new Promise<Participant>(function (resolve: (participant: Participant) => void, reject: (value: any) => void) {
            DatabaseService.findByObjectId(Constants.PARTICIPANT_COLLECTION, id).then((results: any[]) => {
                if (results && results.length > 0) {
                    resolve(results[0]);
                } else {
                    this.validationReject(reject, {id: 'Participant not found'});
                }
            }).catch((err: any) => reject(err));
        });
    }

    getParticipantQuiz(id: string): Promise<ParticipantQuiz> {
        return new Promise<ParticipantQuiz>((resolve: (participantQuiz: ParticipantQuiz) => void, reject: (value: any) => void) => {
            this.getParticipant(id).then((participant: Participant) => {
                if (participant != null) {
                    this.quizService.getQuizByCode(participant.quizCode).then((quiz: Quiz) => {
                        if (quiz != null) {
                            resolve(this.cleanAnsweredQuestionsAndDecreaseScores(participant, quiz));
                        } else {
                            this.validationReject(reject, {quizCode: 'Quiz not found'})
                        }
                    }).catch((err) => reject(err));
                } else {
                    this.validationReject(reject, {id: 'Participant not found'});
                }
            }).catch((err) => reject(err));
        });
    }

    getOrderedParticipantsByQuizCode(quizCode: string): Promise<Participant[]> {
        return new Promise<Participant[]>((resolve: (participants: Participant[]) => void, reject: (value: any) => void) => {
            this.quizService.getQuizByCode(quizCode).then((quiz: Quiz) => {
                DatabaseService.find(Constants.PARTICIPANT_COLLECTION, {quizCode: quiz.code}).then((results: any[]) => {
                    resolve(this.orderParticipants(results ? results : []));
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        });
    }

    startQuiz(participant: Participant): Promise<Participant> {
        participant.startTimeStamp = new Date().getTime();

        return new Promise<Participant>((resolve: (value: Participant) => void, reject: (value: any) => void) => {
            this.update(participant).then((result: Participant) => {
                resolve(result)
            }).catch((err) => reject(err));
        });
    }

    applyAnswer(answer: QuestionAnswer): Promise<ParticipantQuiz> {
        return new Promise<ParticipantQuiz>((resolve: (value: ParticipantQuiz) => void, reject: (value: any) => void) => {
            this.getParticipantQuiz(answer.participantId).then((participantQuiz: ParticipantQuiz) => {
                participantQuiz = this.checkAndApplyAnswer(participantQuiz, answer);
                this.update(participantQuiz.participant).then(() => {
                    resolve(participantQuiz)
                }).catch((err) => reject(err));
            }).catch((err) => reject(err));
        });
    };

    private orderParticipants(participants: Participant[]): Participant[] {
        return participants.sort(this.compare);
    }

    private compare = (participant1: Participant, participant2: Participant): number => {
        let result: number = 0;

        if ((!participant1.totalScore && participant2.totalScore) || (parseInt(<any>participant1.totalScore, 10) < parseInt(<any>participant2.totalScore, 10))) {
            result = 1;
        } else if ((participant1.totalScore && !participant2.totalScore) || (parseInt(<any>participant1.totalScore, 10) > parseInt(<any>participant2.totalScore, 10))) {
            result = -1
        }

        return result;
    };

    private update(participant: Participant): Promise<Participant> {
        return DatabaseService.updateById(Constants.PARTICIPANT_COLLECTION, participant);
    }

    private cleanAnsweredQuestionsAndDecreaseScores(participant: Participant, quiz: Quiz): ParticipantQuiz {
        let result: ParticipantQuiz = this.removeAnsweredQuestions(participant, quiz);

        return this.recalculateScores(result);
    }

    private recalculateScores(participantQuiz: ParticipantQuiz): ParticipantQuiz {
        if (!participantQuiz.participant.startTimeStamp) {
            return participantQuiz;
        }

        let amountOfTimeAfterStart: number = this.getAmountOfTimeAfterStart(participantQuiz.participant);
        this.decreaseScores(participantQuiz.quiz.questions, amountOfTimeAfterStart);

        return participantQuiz;
    }

    private decreaseScores(questions: { [key: string]: Question }, amountOfTimeAfterStart: number): void {
        for (let questionId in questions) {
            if (questions.hasOwnProperty(questionId)) {
                this.decreaseQuestionScore(questions[questionId], amountOfTimeAfterStart);
            }
        }
    }

    private decreaseQuestionScore(question: Question, amountOfTimeAfterStart: number): void {
        question.score = parseInt(<any>question.score, 10) - amountOfTimeAfterStart;

        if (question.score < 0) {
            question.score = 0;
        }
    }

    private getAmountOfTimeAfterStart(participant: Participant): number {
        let milliseconds: number = new Date().getTime() - parseInt(<any>participant.startTimeStamp, 10);

        return Math.floor((milliseconds / 1000));
    }

    private removeAnsweredQuestions(participant: Participant, quiz: Quiz): ParticipantQuiz {
        if (participant.answeredQuestionIds) {
            participant.answeredQuestionIds.forEach((id: string) => delete quiz.questions[id]);
        }

        return new ParticipantQuiz(participant, quiz);
    }

    private checkAndApplyAnswer(participantQuiz: ParticipantQuiz, answer: QuestionAnswer): ParticipantQuiz {
        let question: Question = participantQuiz.quiz.questions[answer.questionId];

        if (!question) {
            return participantQuiz;
        }

        if (this.isAnswerCorrect(question, answer)) {
            this.addQuestionScore(participantQuiz.participant, question);
        }
        if (!participantQuiz.participant.answeredQuestionIds) {
            participantQuiz.participant.answeredQuestionIds = [];
        }
        participantQuiz.participant.answeredQuestionIds.push(answer.questionId);
        delete participantQuiz.quiz.questions[answer.questionId];

        return participantQuiz;
    }

    private addQuestionScore(participant: Participant, question: Question): void {
        let totalScore: number = 0;

        if (participant.totalScore) {
            totalScore = parseInt(<any>participant.totalScore, 10);
        }
        if (question.score) {
            totalScore += parseInt(<any>question.score, 10);
        }

        participant.totalScore = totalScore;
    }

    private isAnswerCorrect(question: Question, answer: QuestionAnswer): boolean {
        let correctAnswerIds: string[] = this.getCorrectAnswerIds(question);

        return Utils.isTwoArraysEqual(correctAnswerIds, answer.answerIds);
    }

    private getCorrectAnswerIds(question: Question): string[] {
        let result: string[] = [];

        for (let key in question.answers) {
            if (question.answers[key].isCorrect) {
                result.push(question.answers[key]._id);
            }
        }

        return result;
    }

    private isParticipantInQuiz(participant: Participant): Promise<Participant> {
        return new Promise<Participant>(function (resolve: (value: Participant) => void, reject: (value: any) => void) {
            DatabaseService.find(Constants.PARTICIPANT_COLLECTION, participant).then((results: any[]) => {
                resolve(results && results.length > 0 ? results[0] : null)
            }).catch((err) => reject(err));
        });
    }

    private validateParticipant(participant: Participant): Promise<boolean> {
        let validator: ParticipantValidator = new ParticipantValidator(participant);
        return validator.validate();
    }

}
