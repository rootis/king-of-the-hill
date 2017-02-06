import Constants from "../common/Constants";

export abstract class AbstractService {

    protected validationReject(reject: (errors: any) => void, errors: any): void {
        reject({[Constants.VALIDATION_ERRORS_PROPERTY]: errors});
    }

}
