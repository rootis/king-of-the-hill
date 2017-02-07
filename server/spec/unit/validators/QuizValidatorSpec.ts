import QuizValidator from "../../../src/validators/QuizValidator";
import Quiz from "../../../src/model/entities/Quiz";
import QuizBuilder from "../../builders/QuizBuilder";

describe("QuizValidator", function () {

    let validator: QuizValidator;

    describe("validateTitle", function () {

        it("title is undefined", function () {
            let title: string;
            let quiz: Quiz = new QuizBuilder().withTitle(title).build();
            let validator: QuizValidator = new QuizValidator(quiz);

            expect((<any>validator).errors).toEqual({});

            (<any>validator).validateTitle();

            expect((<any>validator).errors).toEqual({title: 'Quiz title is required'});
        });

        it("title is null", function () {
            let title: string = null;
            let quiz: Quiz = new QuizBuilder().withTitle(title).build();
            let validator: QuizValidator = new QuizValidator(quiz);

            expect((<any>validator).errors).toEqual({});

            (<any>validator).validateTitle();

            expect((<any>validator).errors).toEqual({title: 'Quiz title is required'});
        });

        it("title is empty", function () {
            let title: string = '';
            let quiz: Quiz = new QuizBuilder().withTitle(title).build();
            let validator: QuizValidator = new QuizValidator(quiz);

            expect((<any>validator).errors).toEqual({});

            (<any>validator).validateTitle();

            expect((<any>validator).errors).toEqual({title: 'Quiz title is required'});
        });

        it("title is too short", function () {
            let title: string = 'A';
            let quiz: Quiz = new QuizBuilder().withTitle(title).build();
            let validator: QuizValidator = new QuizValidator(quiz);

            expect((<any>validator).errors).toEqual({});

            (<any>validator).validateTitle();

            expect((<any>validator).errors).toEqual({title: 'Quiz title is too short'});
        });

        it("title is too long", function () {
            let title: string = '123456789_123456789_123456789_123456789_123456789_1';
            let quiz: Quiz = new QuizBuilder().withTitle(title).build();
            let validator: QuizValidator = new QuizValidator(quiz);

            expect((<any>validator).errors).toEqual({});

            (<any>validator).validateTitle();

            expect((<any>validator).errors).toEqual({title: 'Quiz title is too long'});
        });

        it("title is ok", function () {
            let title: string = 'Title';
            let quiz: Quiz = new QuizBuilder().withTitle(title).build();
            let validator: QuizValidator = new QuizValidator(quiz);

            expect((<any>validator).errors).toEqual({});

            (<any>validator).validateTitle();

            expect((<any>validator).errors).toEqual({});
        });

    });

});
