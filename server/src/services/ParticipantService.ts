'use strict';

import DatabaseService from "./DatabaseService";
import Participant from "../model/entities/Participant";

export default class ParticipantService {

    static PARTICIPANT_COLLECTION: string = 'quiz_participant';

    getParticipant(id: string): Promise<Participant> {
        return new Promise<Participant>(function (resolve: (participant: Participant) => void) {
            DatabaseService.findByObjectId(ParticipantService.PARTICIPANT_COLLECTION, id).then((results: any[]) => {
                resolve(results && results.length > 0 ? results[0] : null)
            });
        });
    }

}
