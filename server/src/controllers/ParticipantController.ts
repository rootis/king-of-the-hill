'use strict';

import {Application, Request, Response} from "express-serve-static-core";
import ParticipantService from "../services/ParticipantService";
import Participant from "../model/entities/Participant";

export default class ParticipantController {

    private participantService = new ParticipantService();

    constructor(app: Application) {
        this.registerRoutes(app);
    }

    getParticipant = (request: Request, response: Response): void => {
        if (request && request.params && request.params.id) {
            this.participantService.getParticipant(request.params.id).then((participant: Participant) => {
                response.send(participant);
            }).catch((err) => response.status(500).send(err));
        } else {
            response.status(500).send({error: 'Participant not found'});
        }
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = '/api/participant';

        app.get(urlPrefix + '/:id', this.getParticipant);
    }

}
