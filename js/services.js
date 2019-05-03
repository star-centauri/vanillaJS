import {Request} from './models.js';
import {Helpers as h$} from './helpers.js';
import {Alert} from './components.js';

export class ProxyFactory {
    constructor() {
        this._enrolled = [];
    }

    register(key, callback) {
        this._enrolled.push({
            key: key,
            callback: callback
        });
    }

    changed(key, parameters) {
        let length = this._enrolled.length;

        for (let i = 0; i < length; i++) {
            if (key == this._enrolled[i].key) {
                this._enrolled[i].callback(parameters);
                //this._enrolled.splice(i, 1);
            }
        }
    }
}

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

    SenderLocation(options) {
        var sender = {
            url: options.url
            ,
            getPreparedUrl: function () {
                return this.url + options.param;
            }
        }
        
        window.location = sender.getPreparedUrl();
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

export class GenerateFile {
    static downloadFile(filename) {
        new HttpService().SenderLocation({
            url: "/App/DownloadFile",
            param: `?fileName=${filename}`
        });
    }

    static fileExist(string) {
        if (string.indexOf('foi gerado o arquivo')) {
            let Strsplit = string.split(" ");
            GenerateFile.downloadFile(Strsplit[Strsplit.length-1]);
        } else
            new Alert(err.Message).showError();
    }
}

export class BindState {
    constructor() {
        this._layoutState = undefined;
        this._callbackState = undefined;
    }

    set layouState(layout) {
        this._layoutState = layout;
    }

    set callbackState(callback) {
        this._callbackState = callback;
    }

    clear() {
        this._layoutState.empty();
    }

    get callbackState() {
        return this._callbackState;
    }

    get layouState() {
        return this._layoutState;
    }
}