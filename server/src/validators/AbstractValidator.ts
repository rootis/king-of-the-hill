export abstract class AbstractValidator {

    protected object: any;
    protected errors: { [key: string]: string } = {};

    constructor(object: any) {
        this.object = object;
    }

    abstract validate(): Promise<boolean>;

    protected applyValidationResults(resolve: (value: boolean) => void, reject: (value: { [key: string]: string }) => void): void {
        for (let key in this.errors) {
            reject(this.errors);
        }
        resolve(true);
    }

    protected validateRequired(attribute: string, errorMessage: string): boolean {
        return this.validateRequiredPassingObject(this.object, attribute, '', errorMessage);
    }

    protected validateRequiredPassingObject(object: any, attribute: string, errorKeyPrefix: string, errorMessage: string): boolean {
        if (!object || !object[attribute] || (typeof object[attribute] === 'string' && object[attribute].trim().length == 0)) {
            this.errors[errorKeyPrefix + attribute] = errorMessage;
            return false;
        }

        return true;
    }

    protected validateNumberPassingObject(object: any, attribute: string, errorKeyPrefix: string, errorMessage: string): boolean {
        if (!object || !object[attribute] || !/^\d+$/.test(object[attribute])) {
            this.errors[errorKeyPrefix + attribute] = errorMessage;
            return false;
        }

        return true;
    }

    protected validateObjectPropertiesRequired(attribute: string, errorMessage: string): boolean {
        return this.validateObjectPropertiesRequiredPassingObject(this.object, attribute, '', errorMessage);
    }

    protected validateObjectPropertiesRequiredPassingObject(object: any, attribute: string, errorKeyPrefix: string, errorMessage: string): boolean {
        if (!object || !object[attribute] || typeof object[attribute] !== 'object') {
            this.errors[errorKeyPrefix + attribute] = errorMessage;
            return false;
        }

        for (let key in object[attribute]) {
            if (object[attribute].hasOwnProperty(key)) {
                return true;
            }
        }

        this.errors[errorKeyPrefix + attribute] = errorMessage;
        return false;
    }

    protected validateTooLong(attribute: string, maxLength: number, errorMessage: string): boolean {
        if (this.object && this.object[attribute] && this.object[attribute].length > maxLength) {
            this.errors[attribute] = errorMessage;
            return false;
        }

        return true;
    }

    protected validateTooShort(attribute: string, minLength: number, errorMessage: string): boolean {
        if (this.object && this.object[attribute] && this.object[attribute].length < minLength) {
            this.errors[attribute] = errorMessage;
            return false;
        }

        return true;
    }

}
