import {Alert} from '../components.js';
import {HttpService, GenerateFile} from '../services.js';
import {ListOcorrencias} from './modelBoard.js'

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
}