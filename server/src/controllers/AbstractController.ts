'use strict';

import {Response} from "express-serve-static-core";

import Constants from "../common/Constants";

export abstract class AbstractController {

    protected sendErrors(response: Response, errors: any): void {
        if (errors && errors[Constants.VALIDATION_ERRORS_PROPERTY]) {
            response.status(400).send(errors[Constants.VALIDATION_ERRORS_PROPERTY]);
        } else {
            console.log('Errors: ', errors);
            response.status(500).send(errors);
        }
    }

}
