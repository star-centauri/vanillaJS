import {Ocorrencias} from './serviceBoard.js';
import {ProxyFactory, GenerateFile} from '../services.js';
import {Board} from '../models.js';
import {MiniElement as i$, 
        Metronic as m$,
        Button,
        GridLayout} from '../components.js';

export class FactoryPattern {
    constructor(options) {
        this._options = options;
    }

    get load() {
        switch (this._options.name) {
            case "Pesquisadores":
                return new Pesquisador(this._options).board;
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

class ComponentsSpecialist {
    static createPanel(title, element) {
        let keys = {
            panel: m$.Panel.panel,
            style: m$.Panel.styleDefault,
            header: m$.Panel.header,
            body: m$.Panel.body
        };

        let portlet = $('<div>');
        let header = $('<div>');
        let body = $('<div>');
        
        portlet.addClass([keys.panel, keys.style].join(' '));
        header.addClass(keys.header);
        body.addClass(keys.body);

        header.append(title);
        body.append(element);

        portlet.append(header);
        portlet.append(body);

        return portlet;
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

        this._layout.adicionarRelatorios(4, showContent.postoAnalitico());
        //_layout.adicionarRelatorios();
        //_layout.adicionarRelatorios();
        //_layout.adicionarOcorrencias();
    }

    _createLayout() {
        let layout = this._options.context,
            relatorio = new GridLayout(),
            ocorrencias = new GridLayout();

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
        let _self = this; //para problemas com funções lexicas

        function consultaPostoAnalitico() {
            let content = $('<div>'),
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
                return btn.getHtml();
            }

            content.append(exportButton());
            return ComponentsSpecialist.createPanel(title, content);
        }

        return {
            postoAnalitico: consultaPostoAnalitico
        }
    }

    get board() {
        return new Board("Operação / Principal", 
                        this._options.context, 
                        true, 
                        this._commands.searchOcorrencias, 
                        true, 
                        [], 
                        false, 
                        false,
                        this._proxy);
    }
}

class Pesquisador {
    constructor(options) {
        this._options = options;
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        let showContent = this._showContent();

        this._layout.adicionarRelatorios(4, showContent.postoAnalitico());
        //_layout.adicionarRelatorios();
        //_layout.adicionarRelatorios();
        //_layout.adicionarOcorrencias();
    }

    _createLayout() {
        let layout = this._options.context,
            relatorio = new GridLayout(),
            ocorrencias = new GridLayout();

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
        let _self = this; //para problemas com funções lexicas

        function consultaPostoAnalitico() {
            let content = $('<div>'),
                title = `<h4>${i$.icon(m$.Icon.checkSquare)} Teste</h4>`
            
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
                return btn.getHtml();
            }

            content.append(exportButton());
            return ComponentsSpecialist.createPanel(title, content);
        }

        return {
            postoAnalitico: consultaPostoAnalitico
        }
    }

    get board() {
        return new Board("Operação / Pesquisadores", 
                        this._options.context, 
                        true, 
                        this._commands.searchOcorrencias, 
                        true, 
                        [], 
                        false, 
                        false,
                        this._proxy);
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