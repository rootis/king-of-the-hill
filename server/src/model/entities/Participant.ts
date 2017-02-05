import {AbstractEntity} from "./AbstractEntity";

export default class Participant extends AbstractEntity {

    participantName: string;
    quizCode: string;
    startTimeStamp: number;
    answeredQuestionIds: string[] = [];
    totalScore: number;

}