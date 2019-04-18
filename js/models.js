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