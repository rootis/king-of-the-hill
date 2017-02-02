'use strict';

import Quiz from "../entities/Quiz";

export default class QuizService {

    getQuiz(id: number): Quiz {
        let result: Quiz = new Quiz();
        result.id = 25;
        result.title = 'uga';
        result.prize = 'praiz';

        return result;
    }

}
