import {ProxyFactory} from '../services.js';

export class ControllerStorie {
    constructor() {
        this._proxy = new ProxyFactory();

        this._list = [];
        this._listCart = [];
        this._quantidadeProduct = 0;
        this._keys = {
            addProductorCard: "addProductorCard"
        }
    }

    set productors(productors) {
        this._list = productors;
    }

    get productors() {
        return [].concat(this._list);
    }

    getProduct(id) {
        return this._list.filter(p => p.id == id)[0];
    }

    registerAddProduct(callback) {
        this._proxy.register(this._keys.addProductorCard, callback);
    }
    changedAddProduct(product) {
        this._listCart.push(product);
        this._quantidadeProduct += 1;
        this._proxy.changed(this._keys.addProductorCard, product);
    }

    get ItHasProductors() {
        return this._listCart.length > 0;
    }
}