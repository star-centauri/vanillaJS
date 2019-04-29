import {Alert} from '../components.js';
import {HttpService, GenerateFile} from '../services.js';
import {ListOcorrencias} from './modelBoard.js';
import {Helpers} from '../helpers.js';

let _service = new HttpService();

export class Ocorrencias {
    static Buscar(onSuccess) {
        _service.Sender('Avaliacao/BuscarOcorrencias', {method: 'POST'})
        .then(Ocorrencias => {
            let _model = new ListOcorrencias(Ocorrencias);
            onSuccess(_model.ocorrencias);
        })
        .catch(err => { 
            console.log(err);
            new Alert(err.Message).showError(); 
        });
    }
    static ConsultarPostoAnalitico(onSuccess) {
        _service.Sender('Relatorio/ConsultarPostoAnalitico', {method: 'POST'})
        .then(filename => { onSuccess(filename) })
        .catch(err => {
            console.log(err);
            GenerateFile.fileExist(err.Message);
        })
    }
    static AtualizarLimitePreco(model, onSuccess) {
        _service.Sender('Avaliacao/AtualizarLimitePreco', {method: 'POST', sendData: JSON.stringify({ ocorrenciaId: model.id })})
        .then(response => { onSuccess(response) })
        .catch(err => {
            console.log(err);
            new Alert(err.Message).showError();
        })
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