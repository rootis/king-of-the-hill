'use strict';

import {Application, Request, Response} from "express-serve-static-core";
import ParticipantService from "../services/ParticipantService";
import ParticipantQuiz from "../model/forms/ParticipantQuiz";
import Participant from "../model/entities/Participant";

export default class ParticipantController {

    private participantService = new ParticipantService();

    constructor(app: Application) {
        this.registerRoutes(app);
    }

    joinQuiz = (request: Request, response: Response): void => {
        this.participantService.validateAndCreateOrLoad(request.body).then((participant: Participant) => {
            response.send(participant);
        }).catch((err) => response.status(500).send(err));
    };

    getParticipantQuiz = (request: Request, response: Response): void => {
        if (request && request.params && request.params.id) {
            this.participantService.getParticipantQuiz(request.params.id).then((participantQuiz: ParticipantQuiz) => {
                response.send(participantQuiz);
            }).catch((err) => response.status(500).send(err));
        } else {
            response.status(500).send({error: 'Participant not found'});
        }
    };

    postAnswer = (request: Request, response: Response): void => {
        this.participantService.applyAnswer(request.body).then((participantQuiz: ParticipantQuiz) => {
            response.send(participantQuiz);
        }).catch((err) => response.status(500).send(err));
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = '/api/participant';

        app.post(urlPrefix + '/join', this.joinQuiz);
        app.get(urlPrefix + '/:id', this.getParticipantQuiz);
        app.post(urlPrefix + '/answer', this.postAnswer);
    }

}
