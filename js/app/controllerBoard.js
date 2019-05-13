import {ProxyFactory} from '../services.js';

export class ControllerStorie {
    constructor() {
        this._list = [];
        this._proxy = new ProxyFactory();
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
        this._proxy.changed(this._keys.addProductorCard, product);
    }
}