'use strict';

import DatabaseService from "./DatabaseService";
import Participant from "../model/entities/Participant";
import QuestionAnswer from "../model/forms/QuestionAnswer";
import QuizService from "./QuizService";
import Quiz from "../model/entities/Quiz";
import Question from "../model/entities/Question";
import Utils from "../utils/Utils";
import ParticipantQuiz from "../model/forms/ParticipantQuiz";
import ParticipantValidator from "../validators/ParticipantValidator";

export default class ParticipantService {

    static PARTICIPANT_COLLECTION: string = 'quiz_participant';

    validateAndCreateOrLoad(participant: Participant): Promise<Participant> {
        return new Promise<Participant>((resolve: (value: Participant) => void, reject: (value: any) => void) => {
            this.validateParticipant(participant).then(() => {
                this.isParticipantInQuiz(participant).then((result: Participant) => {
                    if (result) {
                        resolve(result);
                    } else {
                        DatabaseService.insert(ParticipantService.PARTICIPANT_COLLECTION, participant).then((result: Participant) => {
                            resolve(result);
                        });
                    }
                });
            }).catch((err: any) => reject(err));
        });
    }

    getParticipant(id: string): Promise<Participant> {
        return new Promise<Participant>(function (resolve: (participant: Participant) => void) {
            DatabaseService.findByObjectId(ParticipantService.PARTICIPANT_COLLECTION, id).then((results: any[]) => {
                resolve(results && results.length > 0 ? results[0] : null)
            });
        });
    }

    getParticipantQuiz(id: string): Promise<ParticipantQuiz> {
        let quizService: QuizService = new QuizService();

        return new Promise<ParticipantQuiz>((resolve: (participantQuiz: ParticipantQuiz) => void, reject: (value: any) => void) => {
            this.getParticipant(id).then((participant: Participant) => {
                if (participant != null) {
                    quizService.getQuizByCode(participant.quizCode).then((quiz: Quiz) => {
                        if (quiz != null) {
                            resolve(this.cleanAnsweredQuestionsAndDecreaseScores(participant, quiz));
                        } else {
                            reject({error: 'Quiz not found'});
                        }
                    }).catch((err) => reject(err));
                } else {
                    reject({error: 'Participant not found'});
                }
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
                if (participantQuiz != null) {
                    participantQuiz = this.checkAndApplyAnswer(participantQuiz, answer);
                    this.update(participantQuiz.participant).then(() => {
                        resolve(participantQuiz)
                    }).catch((err) => reject(err));
                } else {
                    reject({error: 'Information not found'});
                }
            }).catch((err) => reject(err));
        });
    };

    private update(participant: Participant): Promise<Participant> {
        return DatabaseService.updateById(ParticipantService.PARTICIPANT_COLLECTION, participant);
    }

    private cleanAnsweredQuestionsAndDecreaseScores(participant: Participant, quiz: Quiz): ParticipantQuiz {
        let result: ParticipantQuiz = this.cleanAnsweredQuestions(participant, quiz);

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
                questions[questionId].score = parseInt(<any>questions[questionId].score, 10) - amountOfTimeAfterStart;
                if (questions[questionId].score < 0) {
                    questions[questionId].score = 0;
                }
            }
        }
    }

    private getAmountOfTimeAfterStart(participant: Participant): number {
        let milliseconds: number = new Date().getTime() - parseInt(<any>participant.startTimeStamp, 10);

        return Math.floor((milliseconds / 1000));
    }

    private cleanAnsweredQuestions(participant: Participant, quiz: Quiz): ParticipantQuiz {
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
        return new Promise<Participant>(function (resolve: (value: Participant) => void) {
            DatabaseService.find(ParticipantService.PARTICIPANT_COLLECTION, participant).then((results: any[]) => {
                resolve(results && results.length > 0 ? results[0] : null)
            });
        });
    }

    private validateParticipant(participant: Participant): Promise<boolean> {
        let validator: ParticipantValidator = new ParticipantValidator(participant);
        return validator.validate();
    }

}
