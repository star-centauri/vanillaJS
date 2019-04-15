class Element {
    constructor(element) {
        this.htmlTemplate = $(element);
    }

    getHtml() {
        if(this.htmlTemplate == undefined) {
           throw new Error("parâmetro 'element' não foi definnido");
        }

        return this.create();
    }

    create() {
        return this.htmlTemplate;
    }

    addHtml(element) {
        this.htmlTemplate.append(element);
    }

    addStyle(atrribute, value) {
        this.htmlTemplate.css(atrribute, value);
    }

    setId(id) {
        this.htmlTemplate.attr("id", id);
    }

    setTitle(title) {
        this.htmlTemplate.attr("title", title);
    }

    addClass(cssClass) {
        this.htmlTemplate.addClass(cssClass);
    }

    removeClass(cssClass) {
        this.htmlTemplate.removeClass(cssClass);
    }

    addAttr(attributeName, attributeValue) {
        this.htmlTemplate.attr(attributeName, attributeValue);
    }

    event(type, callback) {
        this.htmlTemplate.on(type, callback);
    }
    
    find(child) {
        return this.htmlTemplate.find(child);
    }
}

export class Metronic {
    static get BackGround() {
        return{
            Grey: "bg-grey",
            Inverse: "bg-inverse",
            hoverGreen: "bg-hover-green-jungle",
            greySteel: "bg-grey-steel",
            red: "bg-red"
        }   
    }
    static get Button() {
        return {
            btn: "btn",
            btnGroup: "btn-group",
            styleOutline: "btn-outline",
            formCircle: "btn-circle",
            icon: "btn-icon-only",
            bgDanger: "btn-danger",
            bgDefault: "btn-default",
            bgSuccess: "btn-success",
            sizeSm: "btn-sm"
        }  
    }
    static get Icon() {
        return {
            addition: "fa fa-plus",
            save: "fa fa-floppy-o",
            close: "fa fa-times",
            user: "fa fa-user",
            userPlus: "fa fa-user-plus",
            marker: "fa fa-map-marker",
            refresh: "fa fa-refresh",
            check: "fa fa-check",
            checkCircle: "fa fa-check-circle-o",
            ban: "fa fa-ban",
            retweet: "fa fa-retweet",
            map: "fa fa-map",
            reply: "fa fa-reply",
            info: "fa fa-info",
            infoCircle: "fa fa-info-circle",
            search: "fa fa-search",
            download: "fa fa-download",
            checkSquare: "fa fa-check-square-o",
            file: "fa fa-file",
            cog: "fa fa-cog",
            trash: "fa fa-trash",
            cicleRight: "fa fa-arrow-circle-o-right",
            cicleUp: "fa fa-arrow-circle-o-up",
            folderOpen: "fa fa-folder-open",
            warning: "fa fa-warning",
            edit: "fa fa-edit"   
        }
    }
    static get Panel() {
        return {
            panel: "panel",
            header: "panel-heading",
            body: "panel-body",
            styleDefault: "panel-default",   
        }
    }
    static get Pull() {
        return{
            right: "pull-right",
            left: "pull-left"   
        }
    }
    static get Portlet() {
        return {
            portlet: "portlet light",
            border: "bordered",
            styleFit: "portlet-fit",
            title: "portlet-title",
            body: "portlet-body",
            tools: "tools",
            caption: "caption",
            elementRibbon: "mt-element-ribbon",
            captionHelper: "caption-helper",
            captionSubject: "caption-subject",
            captionDescription: "caption-desc",
        }
    }
    static get Font() { 
        return {
            bold: "bold",
            uppercase: "uppercase",
            flamingo: "font-red-flamingo",
            white: "font-white",
            sunglo: "font-red-sunglo",
            red: "bg-font-red"
        }
    }
    static get Label() {
        return {
            label: "label",
            success: "label-success"       
        }
    }
    static get List() {
        return {
            list: "mt-element-list",
            header: "mt-list-head",
            title: "list-title",
            typeSimple: "list-simple",
            item: "mt-list-item"   
        }
    }
    static get Badge() {
        return {
            badge: "badge",
            badgeDark: "badge-dark",
            badgeGreen: "badger-green",
            badgeDanger: "badge-danger"   
        }
    }
    static get Color() {
        return {
            dark: "dark",
            grey: "grey-cascade"   
        }
    }
    static get Form() {
        return {
            formGroup: "form-group",
            formControl: "form-control",
            inputSm: "input-sm",
            inputSmall: "input-small"
        }
    }
    static get Ribbon() {
        return {
            ribbon: "ribbon",
        }
    }
}

export class MiniElement {
    static icon(glyphiconClass) {
        return `<i class="${glyphiconClass}"></i>`;
    }
}

export class Button extends Element {
    constructor(text) {
        super('<button type="button">');
        this.text = text;
    }

    create() {
        if(this.text) {
            super.addHtml(this.text);
        }

        return this.htmlTemplate;
    }

    setGlyphicon(glyphiconClass) {
        super.addHtml(MiniElement.icon(glyphiconClass));
    }

    onClick(callback) {
        if(callback == undefined) {
           throw new Error("Callback não foi definido");
        }

        super.event("click", callback);
    }

}

export class Modal extends Element {
    constructor(title, bodyContent, footerContent, options) {
        super('<div class="modal fade" role="dialog">');

        this._title = title;
        this._body = bodyContent;
        this._footer = footerContent;
        this._options = options;
    }

    _getHeader() {
        return `<div class="modal-header">
                    ${this._title ? this._title : ''}
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                </div>`;
    }

    _getBody() {
        let body = $('<div class="modal-body">');
        if(this._body)
            body.append(this._body);
        
        return body;
    }

    _getFooter() {
        return `<div class="modal-footer">
                    ${this._footer ? this._footer : ''}
                </div>`;
    }

    create() {
        let dialog = $('<div class="modal-dialog">'),
            content = $('<div class="modal-content">');

        if(this._options.size) {
            dialog.addClass(this._options.size);
        }
        if(this._options.css) {
            dialog.addClass(this._options.css);
        }

        content.append(this._getHeader());
        content.append(this._getBody());
        content.append(this._getFooter());

        dialog.append(content);
        this.htmlTemplate.append(dialog);

        return this.htmlTemplate;
    }

    show() {
        let containerModal = $('<div id="modal">');
        containerModal.append(this.htmlTemplate);

        $('#modal').remove();
        $('body').append(containerModal);
        super.getHtml().modal("show");
    }

    close() {
        super.getHtml().modal("hide");
    }
}

export class floatingLabel extends Element {
    constructor(title = '', id) {
        super('<div class="form-group form-md-line-input form-md-floating-label"></div');

        this._id = id;
        this._title = title;
        this._input = $('<input type="text" class="form-control">');
        this._label = $('<label for="form_control_1"></label>');
    }

    create() {
        let container = this.htmlTemplate;

        this._label.text(this._title);              
        if(this._id)
            this._input.attr("id", this._id);
       
        container.append(this._input);
        container.append(this._label);
        return container;
    }

    block(block) {
        let alert = $('<span class="help-block"></span>');
        alert.text(block);
        super.addHtml(alert);
    }

    text(value) {
        this.input.val(value);
    }
}