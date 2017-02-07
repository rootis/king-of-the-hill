export abstract class AbstractBuilder<T> {

    protected entity: T;

    constructor(entity: T) {
        this.entity = entity;
    }

    build(): T {
        return this.entity;
    }

}
