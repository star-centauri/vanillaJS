import {HttpService, User} from './services.js';
import {Models, UserLogon} from './models.js';
import {AppView} from './views.js';

class Controller {
    constructor() {
        this._views = new AppView();
        this._model = new Models();
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

    showMenu(items, itemDefault) {
        let length = items.length,
            menuView = this._views;

        for(let i = 0; i < length; i++) {
            let layoutItem = this._views.createItemsMenu(items[i]); 
            
            if(items[i].subItems.length) {
                let model = items[i].subItems.map(subItem => this._model.MenuItems(subItem));
                layoutItem.find('ul').append(this._views.createSubItemsMenu(model));
            }

            this._views.appendItemsMenu(layoutItem);
        }

        this._views.menuItems.on('click', function() {
            let boardId = $(this).attr('id');
            console.log(boardId);
            menuView.itemsMenuDeactive();
            menuView.itemMenuActive(boardId);
        });

        menuView.itemMenuActive(itemDefault.Id);
    }

    showUser(user) {
        let userView = this._views;

        userView.appendNameUser(user);

        userView.changePassword.click(this._alterPasswordUser.bind(this)); 

        userView.logOut.click(function() {
            console.log("ok2");
        })
    }
}

class AppPriceTrack {
    constructor() {
        this._controller = new Controller();
        this._http = new HttpService();
        this._model = new Models();

        this._inicialization();
    }

    _inicialization() {
        this._http.Sender('App/Load', {method: 'GET'})
        .then(modules => {
            this._controller.showMenu(modules.menu.MenuItems.map(items => this._model.MenuItems(items)), modules.menu.Default);
            this._controller.showUser(modules.userLogged);
        })
        .catch(err => { console.log(err) });
    }
}

var app = new AppPriceTrack();