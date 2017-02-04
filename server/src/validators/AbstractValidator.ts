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
        if (!this.object || !this.object[attribute] || (typeof this.object[attribute] === 'string' && this.object[attribute].trim().length == 0)) {
            this.errors[attribute] = errorMessage;
            return false;
        }

        return true;
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
