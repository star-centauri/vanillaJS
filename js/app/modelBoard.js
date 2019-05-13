export class ListOcorrencias {
    constructor(data) {
        this._list = [];
        this._createModel(data);
    }

    _serialize(data) {
        return {
            Id: data.Ocorrencia.Id,
            CodigoPosto: data.Ocorrencia.PostoId,
            Bandeira: data.Ocorrencia.Bandeira,
            CidadeUf: data.Ocorrencia.Cidade + '/' + data.Ocorrencia.UF,
            Data: data.Ocorrencia.Data,
            CodigoExterno: data.Ocorrencia.Atendimento.CodigoExterno,
            Descricao: data.Ocorrencia.Descricao,
            PrecoAtual: data.Ocorrencia.Preco,
            UrlFotoPlacar: data.UrlFotoPlacar
        }
    }

    _createModel(data) {
        let length = data.length;

        for(let i = 0; i < length; i++) {
            this._list.push(this._serialize(data[i]));
        }
    }

    get ocorrencias() {
        return this._list;
    }
}

export class ListProductors {
    constructor(data) {
        this._list = [];
        this._createModel(data);
    }

    _serialize(data) {
        return {
            id: data.id,
            img: data.img,
            title: data.title,
            describe: data.describe,
            price: data.price
        }
    }

    _createModel(data) {
        let length = data.length;

        for(let i = 0; i < length; i++) {
            this._list.push(this._serialize(data[i]));
        }
    }

    get productors() {
        return this._list;
    }
}