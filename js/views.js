import {MiniElement as m$, 
        Modal, 
        floatingLabel, 
        Button, 
        Metronic as mt$} from './components.js';
import {FactoryPattern} from './app/boards.js';

export class AppView {
    constructor() {
        this._main = $("#main");
        this._menu = $("#boardSelector");
        this._userLogon = $(".dropdown-user");
    }

    addMain(board) {
        this._main.append(board);
    }

    showModal(title, content, footer, options) {
        new Modal(
            title,
            content,
            footer,
            options)
            .show();
    }

    //#region MENU BOARDS
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
    //#endregion

    //#region MENU USER
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
    //#endregion
}

export class Board {
    constructor() {
        this._layout = $('<section>');
        this._filterSelection = $("#filterSelection");
        this._header = $('<div class="header-content">');
        this._content = $('<article id="content" class="col-md-12">');
    }

    _toolbar(items, hasFilter) {
        let length = items.length,
            toolbar = $(`<div id="pageToolbar" class="${hasFilter ? 'display-page-toolbar custom-tollbar' : 'display-page-toolbar'}">`);

        for (var i = 0; i < length; i++) {
            toolbar.append(items[i]);
        }
        return toolbar;
    }

    _build(model) {
        this._header.append(`<ul class="page-breadcrumb">${model.Title}</ul>`);

        if(model.useAdvancedFilter)
            this._filterSelection.append(model.getAdvancedFilter);          
            
        if (model.useToolbar) 
            this._header.append(this._toolbar(model.getToolbar, model.useAdvancedFilter));
        
        this._layout.append(this._header);
    }

    clear() {
        this._content.empty();
        this._filterSelection.empty();
        this._header.empty();
    }

    get Context() {
        return this._content;
    }

    get Content() {
        return this._layout;
    }

    addContent(model) {
        this._build(model);
        this._layout.append(this._content);                            
    }
}

export class FactoryBoard {
    constructor() {
        this._factoryBoard = undefined;
    }

    setOptionsFactory(options) {
        this._factoryBoard = new FactoryPattern(options);
    }

    get load() {
        return this._factoryBoard.load;
    }
}