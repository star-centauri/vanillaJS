import {Ocorrencias} from './serviceBoard.js';
import {ProxyFactory, GenerateFile, BindState} from '../services.js';
import {Board} from '../models.js';
import {MiniElement as i$, 
        Metronic as m$,
        Button,
        GridLayout,
        PortletDefault,
        layout as l$,
        Thumb,
        Modal,
        Alert} from '../components.js';

export class FactoryPattern {
    constructor(options) {
        this._options = options;
    }

    get load() {
        switch (this._options.name) {
            case "Pesquisadores":
                return new Pesquisador(this._options).board;
            case "Ciclos":
                return new Ciclo(this._options).board;
            case "BR":
                return new Br(this._options).board;
            case "Operacao":
                return new Operacao(this._options).board;
            case "Gerencial":
                return new Gerencial(this._options).board;
            case "Pedidos":
                return new Pedidos(this._options).board;
            case "Cronograma":
                return new Cronograma(this._options).board;
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
        this._state = new BindState();
        this._proxy = new ProxyFactory();

        this._commands = this._getSettings();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        let showContent = this._showContent();

        this._layout.adicionarRelatorios(4, showContent.postoAnalitico());
        this._layout.adicionarOcorrencias(12, showContent.ocorrencias());
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

    _getSettings() {
        return {
            searchOcorrencias: () => {
                Ocorrencias.Buscar((ocorrencias) => {
                    this._state.clear();
                    this._state.callbackState(ocorrencias);
                });
            },
            downloadPostoAnalitico: (onSuccess) => {
                Ocorrencias.ConsultarPostoAnalitico(onSuccess);
            },
            atualizarLimitePreco: (ocorrenciaId) => {
                let options = {
                    model: { id: ocorrenciaId },
                    onSuccess: (msg) => {
                        new Alert(msg).showSuccess();
                        this._commands.searchOcorrencias();
                    }
                }
                Ocorrencias.AtualizarLimitePreco(options.model, options.onSuccess);
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

        function adicionarOcorrencias() {
            let container = $('<section>');

            function portlet(table) {
                let context = new PortletDefault({
                    icon: "icon-settings",
                    title: "Ocorrências Pendentes"
                });

                context.addClass("custom-ocorrencia");
                context.appendContent(table);
                return context.getHtml();
            }
            
            function table() {
                const cabecalho = ["Código Posto", "Bandeira", "Cidade/UF", "Data", "Código Externo", "Descrição", "Preço Atual", " "];
                
                let content =  $(`<div class="table-scrollable table-scrollable-borderless">
                                    <table class="table table-hover table-light">
                                        <thead>
                                            <tr class="${[m$.Font.uppercase, m$.BackGround.greySteel].join(' ')}">
                                                ${cabecalho.map(c => `<th>${c}</th>`).join(" ")}
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                 </div>`);

                let onBindState = function() {
                    _self._state.layouState = content.find('tbody');
                    _self._state.callbackState = function(ocorrencias) {
                        var length = ocorrencias.length;

                        if(!length)
                           _self._state.layouState.append('<div class="default-ocorrencia">Sem ocorrencias pendentes no momento.</div>');

                        for(let i = 0; i < length; i++) {
                            ocorrencias[i].exibirDetalhe = atribuirBotaoExibirDetalhe(ocorrencias[i]);
                            adicionarOcorrencia(ocorrencias[i]);
                        }

                        function atribuirBotaoExibirDetalhe(ocorrencia) {
                            var exibirBotaoDetalhe = function() {
                                var btn = new Button();

                                var stylesBtn = function() {
                                    btn.setGlyphicon(m$.Icon.infoCircle);
                                    btn.addClass([
                                        m$.Button.btn,
                                        m$.Button.formCircle,
                                        m$.Button.icon,
                                        m$.Button.bgDefault
                                    ].join(' '));
                                    btn.setTitle("Detalhe Ocorrência");
                                }();

                                btn.onClick(function() {
                                    modalDetalheOcorrencia(ocorrencia);
                                });

                                return btn.getHtml();
                            }

                            function modalDetalheOcorrencia(ocorrencia) {
                                let layout = new function () {
                                    let header = $('<header>');
                                    let body = $('<section id="modal">');

                                    this.appendHeader = function (element) {
                                        header.append(element);
                                    }

                                    this.appendBody = function (element) {
                                        body.append(element);
                                    }

                                    this.getHeader = function () {
                                        return header;
                                    }

                                    this.getBody = function () {
                                        return body;
                                    }
                                }

                                function titulo() {
                                    return `<div class="${[m$.Portlet.caption, m$.Font.sunglo].join(' ')}">
                                                ${i$.icon(m$.Icon.cog)}
                                                <span class="caption-subject bold uppercase"> Detalhe Da Ocorrencia</span>
                                            </div>`;
                                }

                                function exibirDetalhe(detalhe) {
                                    let container = new l$("<article>");

                                    function informacao(id, descricao, precoAtual) {
                                        let element = $('<div class="detalhe-ocorrencia alert alert-danger">');

                                        let exibirBotaoAtualizarLimite = function() {
                                            let btn = new Button("Atualizar Limite");
                                            btn.addAttr("data-dismiss", "modal");
                                            btn.addClass([
                                                m$.Button.btn,
                                                m$.Button.formCircle,
                                                m$.Button.sizeSm,
                                                m$.Button.bgDanger
                                            ].join(' '));

                                            btn.onClick(function() {
                                                _self._commands.atualizarLimitePreco(id);
                                            });

                                            return $(`<div class="${m$.Pull.right}">`).append(btn.getHtml());
                                        }

                                        let exibirDescricao = function() {
                                            return `<div class="${m$.Pull.left}"><strong>Descrição: </strong> ${descricao}</div>`;
                                        }

                                        let exibirPrecoAtual = function() {
                                            return `<div class="${m$.Pull.left}"><strong>Preço Atual: </strong> ${precoAtual}</div>`;
                                        }

                                        element.append(exibirDescricao());
                                        element.append(exibirPrecoAtual());
                                        element.append(exibirBotaoAtualizarLimite());

                                        return element;
                                    }

                                    container.append(informacao(detalhe.Id, detalhe.Descricao, detalhe.PrecoAtual));
                                    container.append(new Thumb(detalhe.UrlFotoPlacar, false, "img-list-resumo-coleta").getHtml());
                                    return container.getHtml();
                                }

                                var show = function () {
                                    layout.appendHeader(titulo());
                                    layout.appendBody(exibirDetalhe(ocorrencia));
                                    
                                    new Modal(
                                        layout.getHeader().html(),
                                        layout.getBody(),
                                        '',
                                        { css: false, size: false }
                                    ).show();
                                }();
                            }

                            return exibirBotaoDetalhe();
                        }

                        function adicionarOcorrencia(ocorrencia) {
                            var element = $('<tr>').attr("id", ocorrencia.Id);                               
                                function adicionarColuna(coluna) {
                                    element.append($('<td>').append(coluna));
                                }

                                adicionarColuna(ocorrencia.CodigoPosto);
                                adicionarColuna(ocorrencia.Bandeira);
                                adicionarColuna(ocorrencia.CidadeUf);
                                adicionarColuna(ocorrencia.Data);
                                adicionarColuna(ocorrencia.CodigoExterno);
                                adicionarColuna(ocorrencia.Descricao);
                                adicionarColuna(ocorrencia.PrecoAtual);
                                adicionarColuna(ocorrencia.exibirDetalhe);

                                _self._state.layouState.append(element);
                        }
                    }
                }();

                return content;
            }

            container.append(portlet(table()));
            return container;
        }

        return {
            postoAnalitico: consultaPostoAnalitico,
            ocorrencias: adicionarOcorrencias
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
        this._state = new BindState();

        this._commands = this._getSettings();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        let showContent = this._showContent();

        this._layout.adicionarLoja(12, showContent.lojaOnline());
    }

    _toolbarItems() {
        let toobarItems = [],
            listaProduto = new BindState(),
            QuantitativoProdutos = new BindState();

        function carrinho() {
            let context = $('<section class="btn-insert">');
            let createButton = function() {
                let btn = new Button();
                btn.setGlyphicon('fa fa-cart-plus');
                btn.addClass([m$.Button.btn, m$.Button.formCircle, m$.Button.icon, m$.Button.bgDefault].join(' '));

                return btn.getHtml();
            };
            let createOpenCart = function() {
                return `<section id="section-cart">
                            <header>
                                <span class="${[m$.Font.flamingo, m$.Font.uppercase].join(' ')}"> Adicionados ao carrinho: </span> 
                                ${i$.icon(m$.Icon.close)}
                            </header>
                            <article>
                                <span class="default-ocorrencia"> Não há nenhum produto no carrinho. </span>
                            </article>
                            <footer></footer>
                        </section>`;
            };
            context.append(createButton());
            context.append(createOpenCart());
            context.find("#section-cart").hide();

            context.on("click", "button", function() {
                context.find("#section-cart").show();
                $(this).hide();
            });

            context.on("click", "#section-cart .fa-times", function() {
                context.find("#section-cart").hide();
                context.find('button').show();
            })

            return context;
        }

        function create() {
            toobarItems.push(carrinho);
            return toobarItems;
        }

        return create();
    }

    _createLayout() {
        let layout = this._options.context,
            content = new GridLayout();

        layout.adicionarLoja = function(size, element) {
            content.addColunm(size, element);
        }
        
        layout.append(content.getHtml());
        return layout;
    }

    _getSettings() {
        return {
            searchLoja: () => {
                this._state.clear();
                this._state.callbackState([
                    {img: 'https://picsum.photos/200/150/?random', title: "Arroz Agulhinha", describe: "Arroz de 5kg tipo 1, fino", price: 'R$13,48'},
                    {img: 'https://picsum.photos/200/150/?random', title: "Feijão Carioca", describe: "Feijão carioca tipo 3 de 1kg", price: 'R$5,70'},
                    {img: 'https://picsum.photos/200/150/?random', title: "Feijão Carioca", describe: "Feijão carioca tipo 3 de 1kg", price: 'R$5,70'},
                    {img: 'https://picsum.photos/200/150/?random', title: "Feijão Carioca", describe: "Feijão carioca tipo 3 de 1kg", price: 'R$5,70'},
                    {img: 'https://picsum.photos/200/150/?random', title: "Feijão Carioca", describe: "Feijão carioca tipo 3 de 1kg", price: 'R$5,70'},
                    {img: 'https://picsum.photos/200/150/?random', title: "Feijão Carioca", describe: "Feijão carioca tipo 3 de 1kg", price: 'R$5,70'}
                ]);
            }
        }
    }

    _showContent() {
        let _self = this;

        function lojaOnline() {
            let content = $('<div class="row">');

            function createProduct(item) {
                return `<section class="col-sm-6 col-md-4 col-lg-3 mt-4">
                                    <div class="card card-inverse card-info">
                                        <img class="card-img-top" src="${item.img}">
                                        <div class="card-block">
                                            <h4 class="card-title">${item.title}</h4>
                                            <div class="card-text">${item.describe}</div>
                                        </div>
                                        <div class="card-footer">
                                            <small>${item.price}</small>
                                            <button class="btn btn-info float-right btn-sm pull-right">Adicionar ao Carrinho</button>
                                        </div>
                                    </div>
                              </section>`
            }

            let onBindState = function() {
                _self._state.layouState = content;
                _self._state.callbackState = function(products) {
                    content.append(products.map(p => createProduct(p)).join(' '));
                }
            }();
            return content;
        }

        return {
            lojaOnline: lojaOnline
        }
    }

    get board() {
        return new Board("Operação / Loja Online", 
                        this._options.context, 
                        true, 
                        this._commands.searchLoja, 
                        true, 
                        this._toolbarItems(), 
                        false, 
                        false,
                        this._proxy);
    }
}

class Ciclo {
    constructor(options) {
        this._options = options;
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        this._layout.adicionarContent(12, this._showContent());
    }

    _createLayout() {
        let layout = this._options.context,
            content = new GridLayout();

        layout.adicionarContent = function(size, element) {
            content.addColunm(size, element);
        }
        
        layout.append(content.getHtml());
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
        return `<h1>Board de Ciclo</h1>`
    }

    get board() {
        return new Board("Operação / Ciclo", 
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

class Gerencial {
    constructor(options) {
        this._options = options;
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        this._layout.adicionarContent(12, this._showContent());
    }

    _createLayout() {
        let layout = this._options.context,
            content = new GridLayout();

        layout.adicionarContent = function(size, element) {
            content.addColunm(size, element);
        }
        
        layout.append(content.getHtml());
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
        return `<h1>Board de Gerencial</h1>`
    }

    get board() {
        return new Board("Operação / Gerencial", 
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

class Pedidos {
    constructor(options) {
        this._options = options;
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        this._layout.adicionarContent(12, this._showContent());
    }

    _createLayout() {
        let layout = this._options.context,
            content = new GridLayout();

        layout.adicionarContent = function(size, element) {
            content.addColunm(size, element);
        }
        
        layout.append(content.getHtml());
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
        return `<h1>Board de Pedidos</h1>`
    }

    get board() {
        return new Board("Operação / Pedido", 
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

class Br {
    constructor(options) {
        this._options = options;
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        this._layout.adicionarContent(12, this._showContent());
    }

    _createLayout() {
        let layout = this._options.context,
            content = new GridLayout();

        layout.adicionarContent = function(size, element) {
            content.addColunm(size, element);
        }
        
        layout.append(content.getHtml());
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
        return `<h1>Board de BR</h1>`
    }

    get board() {
        return new Board("Operação / BR", 
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

class Cronograma {
    constructor(options) {
        this._options = options;
        this._proxy = new ProxyFactory();

        this._commands = this._command();
        this._layout = this._createLayout();
        this._initialization();
    }

    _initialization() {
        this._layout.adicionarContent(12, this._showContent());
    }

    _createLayout() {
        let layout = this._options.context,
            content = new GridLayout();

        layout.adicionarContent = function(size, element) {
            content.addColunm(size, element);
        }
        
        layout.append(content.getHtml());
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
        return `<h1>Board de Cronograma</h1>`
    }

    get board() {
        return new Board("Operação / Cronograma", 
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