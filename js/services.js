import {Models} from './models.js';
import {Helpers as h$} from './helpers.js';

export class HttpService {
    constructor() {
        this._model = new Models(); 
    }

    _handleErrors(response) {
		if(!response.ok)
			throw new Error(response.statusText);
		return response; 
    }

    Sender(url, options) {
        let request = this._model.Request(options);
        return fetch(url, request)
                .then(response => this._handleErrors(response))
                .then(response => response.json())
                .then(data => data.responseData);
    }
}

export class User extends HttpService {
    constructor() {
        super();
    }

    tryGetUserLogged(onSuccess) {
        this.Sender('User/GetUserLogged', {method: 'GET'})
        .then(usuario => onSuccess(usuario))
        .catch(err => { console.log(err) });
    }

    tryChangePassword(data, onSuccess) {
        let model = h$.ObjToJson({
            OldPassword: data.oldPassword, 
            NewPassword: data.newPassword, 
            ConfirmPassword: data.confirmPassword
        });

        this.Sender('User/ChangePassword', {method: 'POST', sendData: model})
        .then(msg => {
            console.log(msg);
            onSuccess();
        })
        .catch(err => { console.log(err) });
    }
}