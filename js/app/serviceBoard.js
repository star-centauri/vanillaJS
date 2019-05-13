import {Alert} from '../components.js';
import {HttpService, GenerateFile} from '../services.js';
import {ListOcorrencias, ListProductors} from './modelBoard.js';

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

export class OnlineStorie {
    static Search(onSuccess) {
        let _model = new ListProductors([
            {id: 1, img: 'https://picsum.photos/200/150/?random', title: "Arroz Agulhinha", describe: "Arroz de 5kg tipo 1, fino", price: 'R$13,48'},
            {id: 2, img: 'https://picsum.photos/200/150/?random', title: "Feijão Carioca", describe: "Feijão carioca tipo 3 de 1kg", price: 'R$5,70'},
            {id: 3, img: 'https://picsum.photos/200/150/?random', title: "Feijão preto", describe: "Feijão prito de 1kg", price: 'R$4,65'},
            {id: 4, img: 'https://picsum.photos/200/150/?random', title: "Pipoca", describe: "pipoca premium de 1kg", price: 'R$3,25'},
            {id: 5, img: 'https://picsum.photos/200/150/?random', title: "Carre suíno", describe: "1kg de carne", price: 'R$8,95'},
            {id: 6, img: 'https://picsum.photos/200/150/?random', title: "coxa de frango", describe: "1kg", price: 'R$6,80'}
        ]);
        onSuccess(_model.productors);
    }
}