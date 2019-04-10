import {HttpService} from './services.js';
import {Models} from './models.js';
import {AppView} from './views.js';

class Controller {
    constructor() {
        this._views = new AppView();
    }

    adicionarItemsNoMenu(items) {
        let listItems = [],
            length = items.length;

        for(let i = 0; i < length; i++) {
            let layoutItem = this._views.createItemsMenu(items[i]); 
            
            if(items[i].subItems.length) {
                layoutItem
                    .getElementsByTagName('ul')[0]
                    .appendChild(this._views.createSubItemsMenu(items[i].subItems));
            }

            listItems.push(layoutItem[0]);
        }

        this._views.appendItemsMenu(listItems.join(' '));
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
            this._controller
                .adicionarItemsNoMenu(modules.menu.MenuItems.map(items => this._model.MenuItems(items)));
        })
        .catch(err => { console.log(err) });
        //this.menu.addEventListener('click', )
    }
}

var app = new AppPriceTrack();