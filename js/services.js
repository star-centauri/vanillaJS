import {Models} from './models.js';

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