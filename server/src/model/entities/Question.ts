import {AbstractEntity} from "./AbstractEntity";
import Answer from "./Answer";

export default class Question extends AbstractEntity {

    score: number;
    answers: {[key: string]: Answer} = {};
    text: string;
    type: string;

}
