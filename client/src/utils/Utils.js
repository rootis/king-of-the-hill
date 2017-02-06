export default class Utils {

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

    static ajaxGet(url) {
        let options = {
            method: "GET"
        };

        return Utils.ajax(url, options);
    }

    static ajaxPost = (url, data) => {
        let options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };

        return Utils.ajax(url, options);
    };

    static ajax(url, options) {
        return new Promise(function (resolve, reject) {
            fetch(url, options).then(response => response.json().then(json => ({
                    status: response.status,
                    json
                })
            )).then((response) => {
                if (response.status >= 400) {
                    reject(response.json);
                } else {
                    resolve(response.json);
                }
            }, function (error) {
                reject(error);
            });
        });
    }

}
