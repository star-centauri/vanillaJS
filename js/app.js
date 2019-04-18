import {HttpService, User} from './services.js';
import {MenuModel, UserLogon} from './models.js';
import {AppView} from './views.js';

class Controller {
    constructor() {
        this._views = new AppView();
        this._model = new MenuModel();
        this._user = new User();
    }

    _alterPasswordUser() {
        let body = this._views.formChangePassword(),
            service = this._user;

        function alterPass() {
            let model = new UserLogon(
                body.find('#oldPassword').val(),
                body.find('#newPassword').val(),
                body.find('#confirmPassword').val()
            );
            
            service.tryChangePassword(model.getData, () => $('.modal').modal('hide'));
        }

        body.find('button').click(alterPass);
        this._views.showModal("Mudar Senha", body, '', {size: "modal-medium", css: false});
    }

    _logOff() {
        this._user.tryLogOut();
    }

    _loadBoard(boardId) {
        console.log(boardId);
    }

    showMenu(items) {
        let length = items.length;

        for(let i = 0; i < length; i++) {
            let layoutItem = this._views.createItemsMenu(items[i]); 
            
            if(items[i].subItems.length) {
                let model = items[i].subItems.map(subItem => this._model.ItemMenu(subItem));
                layoutItem.find('ul').append(this._views.createSubItemsMenu(model));
            }

            this._views.appendItemsMenu(layoutItem);
        }
    }

    showUser(user) {
        let userView = this._views;

        userView.appendNameUser(user);

        userView.changePassword.click(this._alterPasswordUser.bind(this)); 
        userView.logOut.click(this._logOff.bind(this));
    }

    showBoards(boardDefault) {
        let menuView = this._views,
            loadBoard = this._loadBoard;

        menuView.menuItems.on('click', function() {
            let boardId = $(this).attr('id'); 
            loadBoard(boardId);
            menuView.itemsMenuDeactive();
            menuView.itemMenuActive(boardId);
        });

        this._views.itemMenuActive(boardDefault.Id);
        loadBoard(boardDefault.Id);
    }
}

class AppPriceTrack {
    constructor() {
        this._controller = new Controller();
        this._http = new HttpService();
        this._model = new MenuModel();

        this._inicialization();
    }

    _load(data) {
        this._controller.showMenu(data.menu.MenuItems.map(items => this._model.ItemMenu(items)));
        this._controller.showUser(data.userLogged);
        this._controller.showBoards(data.menu.Default);
    }

    _inicialization() {
        this._http.Sender('App/Load', { method: 'GET' })
        .then(modules => this._load(modules))
        .catch(err => { 
            console.log(err);
            new Alert(err.Message).showError();  
        });
    }
}

var app = new AppPriceTrack();