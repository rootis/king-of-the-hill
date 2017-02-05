import {AbstractEntity} from "./AbstractEntity";

export default class Participant extends AbstractEntity {

    participantName: string;
    quizCode: string;
    answeredQuestionIds: string[] = [];
    totalScore: number;

}