import {createBoard} from './components.js';

export class FactoryPattern {
    constructor(options) {
        this._options = options;
    }

    get load() {
        switch (this._options.name) {
            case "Pesquisadores":
                return new Pesquisador(this._options);
            case "Ciclos":
                return new Ciclo(this._options);
            case "BR":
                return new Br(this._options);
            case "Operacao":
                return new Operacao(this._options);
            case "Gerencial":
                return new Gerencial(this._options);
            case "Pedidos":
                return new Pedidos(this._options);
            case "Cronograma":
                return new Cronograma(this._options);
            default:
                console.log("O Board inicial não foi definido");
                break;
        }
    }
}

class Operacao {
    constructor(options) {
        this._options = options;
    }
}

class Pesquisador {
    constructor(options) {
        this._options = options;
    }
}

class Ciclo {
    constructor(options) {
        this._options = options;
    }
}

class Gerencial {
    constructor(options) {
        this._options = options;
    }
}

class Pedidos {
    constructor(options) {
        this._options = options;
    }
}

class Br {
    constructor(options) {
        this._options = options;
    }
}

class Cronograma {
    constructor(options) {
        this._options = options;
    }
}