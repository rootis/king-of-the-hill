import Participant from "../entities/Participant";
import Quiz from "../entities/Quiz";

export default class ParticipantQuiz {

    constructor(public participant: Participant, public quiz: Quiz) {
    }

}
