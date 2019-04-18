import {MiniElement as m$, 
        Modal, 
        floatingLabel, 
        Button, 
        Metronic as mt$} from './components.js'

export class AppView {
    constructor() {
        this._menu = $("#boardSelector");
        this._userLogon = $(".dropdown-user");
    }

    showModal(title, content, footer, options) {
        new Modal(
            title,
            content,
            footer,
            options)
            .show();
    }

    // BEGIN - Layout e estilização exclusivas do Menu //
    createItemsMenu(item) {
        return $(`<li class="nav-item nav-main">
                    <a href="javascript:;" class="nav-link nav-toggle" id="principal">
                        ${m$.icon(item.icon)}
                        <span class="title">${item.title}</span>
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu" style="display: none;"></ul>
                </li>`);
    }

    createSubItemsMenu(subItems) {
        return subItems.map(item => 
                `<li class="nav-item start">
                    <a href="#" class="nav-link" id="${item.id}">
                        ${m$.icon(item.icon)}
                        <span class="title">${item.title}</span>
                    </a>
                </li>`).join(' ');
    }

    appendItemsMenu(layoutItems) {
        this._menu.append(layoutItems);
    }

    itemMenuActive(itemId) {
        let item = this._menu.find('#'+itemId);
        item.closest('li').addClass('active open');
        item.closest('.nav-main').addClass('active open');
    }

    itemsMenuDeactive() {
        let items = this._menu.find('li > ul li a');
        items.closest('li').removeClass('active open');
        items.closest('.nav-main').removeClass('active open');
    }

    get menuItems() {
        return this._menu.find('li > ul li a');
    }
    // END //

    formChangePassword() {
        let container = $('<div class="text-center">');
        function createInput(title, id) {
            let element = new floatingLabel(title).getHtml();
            element.find('input').attr('type', 'password');
            element.find('input').attr('id', id);
            return element;
        };
        function adicionarBotaoConfirmacao() {
            var btn = new Button("Confirmar");
            btn.addClass([mt$.Button.btn, mt$.Button.bgDanger].join(' '));
            return btn.getHtml();
        };
        
        container.append(createInput("Senha Atual:", 'oldPassword'));
        container.append(createInput("Nova Senha:", 'newPassword'));
        container.append(createInput("Confimar Nova Senha:", 'confirmPassword'));
        container.append(adicionarBotaoConfirmacao());

        return container;
    }

    appendNameUser(user) {
        this._userLogon.find('#userLogin').append(user);
    }

    get changePassword() {
        return this._userLogon.find('#changePassword');
    }

    get logOut() {
        return this._userLogon.find('#logOut');
    }
}

export class FactoryBoard {
    constructor(options) {
        this._board = options;
    }

    get load() {
        switch (this._board) {
            case "Pesquisadores":
                return this.createPesquisador(options);
            case "Ciclos":
                return this.createCiclo(options);
            case "Suporte":
                return this.createSuporte(options);
            case "Desenvolvimento":
                return this.createDesenvolvimento(options);
            case "Infra":
                return this.createInfraestrutura(options);
            case "BR":
                return this.createClienteBR(options);
            case "Raizen":
                return this.createClienteRaizen(options);
            case "Ipiranga":
                return this.createClienteBR(options);
            case "Operacao":
                return this.createOperacao(options);
            case "Gerencial":
                return this.createGerencial(options);  
            case "Pedidos":
                return this.createPedidos(options);
            case "Cronograma":
                return this.createCronograma(options);
            default:
                console.log("O Board inicial não foi definido");
                break;
        }
    }
}