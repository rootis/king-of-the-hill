'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import ParticipantService from "../services/ParticipantService";
import Participant from "../model/entities/Participant";
import Board from "../model/forms/Board";

export default class BoardController {

    private participantService = new ParticipantService();

    constructor(app: Application) {
        this.registerRoutes(app);
    }

    getBoardInformation = (request: Request, response: Response): void => {
        if (request && request.params && request.params.quizCode) {
            this.participantService.getOrderedParticipantsByQuizCode(request.params.quizCode).then((participants: Participant[]) => {
                response.send(new Board(participants));
            }).catch((err) => response.status(500).send(err));
        } else {
            response.status(500).send({errors: {quizCode: 'Quiz code is required'}});
        }
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = '/api/board';

        app.get(urlPrefix + '/:quizCode', this.getBoardInformation);
    }

}
