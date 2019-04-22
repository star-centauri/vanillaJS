import {Ocorrencias} from './serviceBoard.js';
import {ProxyFactory, GenerateFile} from '../services.js';
import {Board} from '../models.js';
import {MiniElement as i$, 
        Metronic as m$,
        Button} from '../components.js';

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
                return new Operacao(this._options).board;
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
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        let showContent = this._showContent();

        _layout.adicionarRelatorios(4, showContent.postoAnalitico());
        //_layout.adicionarRelatorios();
        //_layout.adicionarRelatorios();
        //_layout.adicionarOcorrencias();
    }

    _createLayout() {
        let layout = options.context,
            relatorio = new E$.GridLayout(),
            ocorrencias = new E$.GridLayout();

        layout.adicionarRelatorios = function(size, element) {
            relatorio.addColunm(size, element);
        }

        layout.adicionarOcorrencias = function(size, element) {
            ocorrencias.addColunm(size, element);
        }
        
        layout.append(relatorio.getHtml());
        layout.append(ocorrencias.getHtml());
        return layout;
    }

    _command() {
        return {
            searchOcorrencias: () => {
                return {
                    onSuccess: (ocorrencias) => {
                        this._showContent(ocorrencias);
                    }
                    ,
                    command: Ocorrencias.Buscar
                }
            },
            downloadPostoAnalitico: (onSuccess) => {
                Ocorrencias.ConsultarPostoAnalitico(onSuccess);
            }
        }
    }

    _showContent() {
        function consultaPostoAnalitico() {
            let _self = this,
                content = $('<div>'),
                title = `<h4>${i$.icon(m$.Icon.checkSquare)} Posto analítico</h4>`
            
            function exportButton() {
                let btn = new Button("Gerar"),
                downloadConsulta = () => {
                    _self._commands.downloadPostoAnalitico(filename => 
                                    GenerateFile.downloadFile(filename));
                };

                btn.addClass([
                    m$.Button.btn,
                    m$.Button.bgDefault, 
                    m$.Pull.right
                ].join(' '));

                btn.onClick(downloadConsulta);
                return button.getHtml();
            }


            content.append(exportButton());
            return Elements.createPanel(title, content);
        }

        return {
            postoAnalitico: consultaPostoAnalitico
        }
    }

    get board() {
        return this._board;
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