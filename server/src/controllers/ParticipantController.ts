'use strict';

import {AbstractController} from "./AbstractController";
import {Application, Request, Response} from "express-serve-static-core";
import ParticipantService from "../services/ParticipantService";
import ParticipantQuiz from "../model/forms/ParticipantQuiz";
import Participant from "../model/entities/Participant";
import Constants from "../common/Constants";

export default class ParticipantController extends AbstractController {

    private participantService = new ParticipantService();

    constructor(app: Application) {
        super();
        this.registerRoutes(app);
    }

    joinQuiz = (request: Request, response: Response): void => {
        this.participantService.validateAndCreateOrLoad(request.body).then((participant: Participant) => {
            response.send(participant);
        }).catch((err) => this.sendErrors(response, err));
    };

    getParticipantQuiz = (request: Request, response: Response): void => {
        if (request && request.params && request.params.id) {
            this.participantService.getParticipantQuiz(request.params.id).then((participantQuiz: ParticipantQuiz) => {
                response.send(participantQuiz);
            }).catch((err) => this.sendErrors(response, err));
        } else {
            response.status(400).send({id: 'Participant not found'});
        }
    };

    startQuiz = (request: Request, response: Response): void => {
        this.participantService.startQuiz(request.body).then((participant: Participant) => {
            response.send(participant);
        }).catch((err) => response.status(500).send(err));
    };

    postAnswer = (request: Request, response: Response): void => {
        this.participantService.applyAnswer(request.body).then((participantQuiz: ParticipantQuiz) => {
            response.send(participantQuiz);
        }).catch((err) => response.status(500).send(err));
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = Constants.REST_API_URL_PREFIX + '/participant';

        app.post(urlPrefix + '/join', this.joinQuiz);
        app.get(urlPrefix + '/:id', this.getParticipantQuiz);
        app.post(urlPrefix + '/start-quiz', this.startQuiz);
        app.post(urlPrefix + '/answer', this.postAnswer);
    }

}
