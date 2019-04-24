import {refreshButton} from './components.js';

export class MenuModel {
    ItemMenu(item) {
        return {
            id: item.Id,
            icon: item.Icon,
            title: item.Name,
            subItems: item.SubItems
        }
    }
}

export class Request {
    constructor(options) {
        this._method = options.method || function () { throw new Error('method is undefined') };
        this._headers = {
            "Content-Type": options.contentType || "application/json",
        };
        this._body = options.sendData;

        Object.freeze(this);
    }

    get getData() {
        return {
            method: this._method,
            headers: this._headers,
            body: this._body
        }
    }
}

export class UserLogon {
    constructor(oldPassword, newPassword, confirmNewPassword) {
        this._oldPassword = oldPassword;
        this._newPassword = newPassword;
        this._confirmNewPassord = confirmNewPassword;       
        
        Object.freeze(this);
    }

    get getData() {
        return {
            oldPassword: this._oldPassword,
            newPassword: this._newPassword,
            confirmPassword: this._confirmNewPassord
        }
    }
}

export class Board {
    constructor(title, context, useRefresh, 
                command, showLoad, toolbarItems, 
                advancedFilter, useFilter, proxy) {
        this._validation(title, context);
        this._title = title;
        this._context = context;
        this._useRefresh = useRefresh;
        this._useFilter = useFilter;
        this._searchCommand = command;
        this._showBoardLoad = showLoad;
        this._toolbarItems = toolbarItems || [];
        this._advancedFilter = advancedFilter;
        
        this._proxy = proxy;//new ProxyFactory();
        this._create();
    }

    _validation(title, context) {
        if(!title || !context)
            throw new Error("Propriedades title e/ou context vazias.");
    }

    _addButtonRefresh() {
        this._toolbarItems.push(new refreshButton(this._searchCommand));
    }

    _create() {
        if(this._showBoardLoad)
            this._searchCommand();
        
        if(this._useFilter)
            this._proxy.register('Model', this._searchCommand);

        if(this._useRefresh)
            this._addButtonRefresh();
    }

    get Title() {
        return this._title;
    }
    
    get getToolbar() {
        return this._toolbarItems;
    }
    
    get useToolbar() {
        return this._toolbarItems.length > 0;
    }
    
    get useAdvancedFilter() {
        return this._advancedFilter.length > 0;
    } 
    
    get getAdvancedFilter() {
        return this._advancedFilter;
    }    
}