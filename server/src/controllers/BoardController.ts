'use strict';

import {Application, Request, Response} from "express-serve-static-core";

import {AbstractController} from "./AbstractController";
import ParticipantService from "../services/ParticipantService";
import Participant from "../model/entities/Participant";
import Board from "../model/forms/Board";
import Constants from "../common/Constants";

export default class BoardController extends AbstractController {

    private participantService = new ParticipantService();

    constructor(app: Application) {
        super();
        this.registerRoutes(app);
    }

    getBoardInformation = (request: Request, response: Response): void => {
        if (request && request.params && request.params.quizCode) {
            this.participantService.getOrderedParticipantsByQuizCode(request.params.quizCode).then((participants: Participant[]) => {
                response.send(new Board(participants));
            }).catch((err) => this.sendErrors(response, err));
        } else {
            response.status(400).send({quizCode: 'Quiz code is required'});
        }
    };

    private registerRoutes(app: Application): void {
        let urlPrefix: string = Constants.REST_API_URL_PREFIX + '/board';

        app.get(urlPrefix + '/:quizCode', this.getBoardInformation);
    }

}
