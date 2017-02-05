import Question from "./Question";
import {AbstractEntity} from "./AbstractEntity";

export default class Quiz extends AbstractEntity {

    code: string;
    title: string;
    prize: string;
    questions: {[key: string]: Question} = {};

}
