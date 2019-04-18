import {Request} from './models.js';
import {Helpers as h$} from './helpers.js';
import {Alert} from './components.js';

export class HttpService {
    _handleErrors(response) {
		if(!response.ok)
			throw new Error(response.statusText);
		return response; 
    }

    _requestSuccess(data) {
        if(data.success){
            return data;
        }
    
        throw data.responseData;
    }

    Sender(url, options = {}) {
        let _request = new Request(options);

        return fetch(url, _request.getData)
                .then(response => this._handleErrors(response))
                .then(response => response.json())
                .then(data => this._requestSuccess(data))
                .then(data => data.responseData);
    }
}

export class User extends HttpService {
    constructor() {
        super();
    }

    _reload() {
        window.location.reload();
    }

    tryGetUserLogged(onSuccess) {
        this.Sender('User/GetUserLogged', {method: 'GET'})
        .then(usuario => onSuccess(usuario))
        .catch(err => { 
            console.log(err);
            new Alert(err.Message).showError(); 
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
            new Alert(msg).showSuccess();
            onSuccess();
        })
        .catch(err => { 
            console.log(err);
            new Alert(err.Data.join(' <br> ')).showError();
        });
    }

    tryLogOut() {
        this.Sender('User/LogOff', {method: 'GET'})
        .then(() => this._reload())
        .catch(err => { 
            console.log(err);
            new Alert(err.Message).showError(); 
        });
    }

    tryExpirationSession(response) {
        let expiration = response.indexOf("logOn_form") > -1 ? true : false;

        if(expiration) {
            new Alert("Sua sessão expirou.").showError(); 
            setTimeout(function() {
                this._reload();
            }, 1000);
        } else {
            throw new Error("response is not defined.");
        }
    }
}