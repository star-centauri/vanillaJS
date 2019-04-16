import {Models} from './models.js';
import {Helpers as h$} from './helpers.js';
import {Alert} from './components.js';

export class HttpService {
    constructor() {
        this._model = new Models(); 
    }

    _handleErrors(response) {
		if(!response.ok)
			throw new Error(response.statusText);
		return response; 
    }

    Sender(url, options = {}) {
        console.log(options);
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
        this._alert = new Alert();
    }

    _reload() {
        window.location.reload();
    }

    tryGetUserLogged(onSuccess) {
        this.Sender('User/GetUserLogged', {method: 'GET'})
        .then(usuario => onSuccess(usuario))
        .catch(err => { 
            console.log(err);
            this._alert.showError(err.Message); 
        });
    }

    tryChangePassword(data, onSuccess) {
        let model = h$.ObjToJson({
            OldPassword: data.oldPassword, 
            NewPassword: data.newPassword, 
            ConfirmPassword: data.confirmPassword
        });

        this.Sender('User/ChangePassword', {method: 'POST', sendData: model})
        .then(msg => {
            this._alert.showSuccess(msg);
            onSuccess();
        })
        .catch(err => { 
            console.log(err);
            this._alert.showError(err.Message);
        });
    }

    tryLogOut() {
        this.Sender('User/LogOff', {method: 'GET'})
        .then(() => this._reload())
        .catch(err => { 
            console.log(err);
            this._alert.showError(err.Message); 
        });
    }

    tryExpirationSession(response) {
        let expiration = response.indexOf("logOn_form") > -1 ? true : false;

        if(expiration) {
            this._alert.showError("Sua sessão expirou.");
        
            setTimeout(function() {
                this._reload();
            }, 1000);
        } else {
            throw new Error("response is not defined.");
        }
    }
}