import {AbstractBuilder} from "./AbstractBuilder";
import Quiz from "../../src/model/entities/Quiz";
import Question from "../../src/model/entities/Question";

export default class QuizBuilder extends AbstractBuilder<Quiz> {

    constructor() {
        super(new Quiz());
    }

    withCode(code: string): QuizBuilder {
        this.entity.code = code;

        return this;
    }

    withTitle(title: string): QuizBuilder {
        this.entity.title = title;

        return this;
    }

    withPrize(prize: string): QuizBuilder {
        this.entity.prize = prize;

        return this;
    }

    withQuestions(questions: { [key: string]: Question }): QuizBuilder {
        this.entity.questions = questions;

        return this;
    }

}
