export default class FormUtils {

    static handleChange(event, entity) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const names = target.name.split('.');

        this.updateValue(names, value, entity);

        return entity;
    }

    static updateValue(names, value, entity) {
        for (let i = 0; i < names.length - 1; i++) {
            entity = entity[names[i]];
        }
        entity[names[names.length - 1]] = value;
    }

}
