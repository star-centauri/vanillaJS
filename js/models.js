export class Models {
    Request(options = {}) {
        return {
            method: options.method || function () { throw new Error('method is undefined') },
            headers: {
                "Content-Type": options.contentType || "application/json",
            },
            body: options.sendData
        }
    }

    MenuItems(item) {
        return {
            id: item.Id,
            title: item.Name,
            icon: item.Icon,
            subItems: item.SubItems
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