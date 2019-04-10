import {MiniElement as m$} from './components.js'

export class AppView {
    constructor() {
        let $ = document.createElement.bind(document);
        this._menu = document.getElementById("boardSelector");
    }

    createItemsMenu(item) {
        return $(`<li class="nav-item nav-main">
                    <a href="javascript:;" class="nav-link nav-toggle" id="principal">
                        ${m$.icon(item.icon)}
                        <span class="title">${item.title}</span>
                        <span class="arrow"></span>
                    </a>
                    ${item.subItems.length ? `<ul class="sub-menu" style="display: none;"></ul>` : ''}
                </li>`)[0];
    }

    createSubItemsMenu(subItems) {
        return $(subItems.map(item => 
            `<li class="nav-item start">
                <a href="#" class="nav-link" id="${item.id}">
                    ${m$.icon(item.icon)}
                    <span class="title">${item.title}</span>
                </a>
            </li>`).join(' '))[0];
    }

    appendItemsMenu(layoutItems) {
        this._menu.appendChild($(layoutItems)[0]);
    }
}