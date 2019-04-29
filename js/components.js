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

export class layout {
    constructor(element) {
        if (element == undefined) {
            throw new Error("element undefined");
        }
        this._container = $(element);
    }

    getHtml() {
        return this._container;
    }

    append(element) {
        this._container.append(element);
    }

    addClass(style) {
        this._container.addClass(style);
    }

    removeClass(style) {
        this._container.removeClass(style);
    }

    attr(atributeName, atributeValue) {
        this._container.attr(atributeName, atributeValue);
    }

    find(son) {
        return this._container.find(son);
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

export class Portlet extends layout {
    constructor() {
        super('<div>');

        this._keys = {
            portlet: Metronic.Portlet.portlet,
            style: Metronic.BackGround.Inverse,
            title: Metronic.Portlet.title,
            body: Metronic.Portlet.body,
            caption: Metronic.Portlet.caption,
            tools: Metronic.Portlet.tools
        }
        
        this._header = $('<div>');
        this._body = $('<div>');
        this.create();
    }

    create() {
        super.addClass([this._keys.portlet, this._keys.style].join(' '));
        super.append(this._header.addClass(this._keys.title));
        super.append(this._body.addClass(this._keys.body));
    }

    setTitle(element) {
        let caption = $('<div>');

        let adicionarItem = item => {
            caption.append(item);
        }

        if(Array.isArray(element)) {
            var length = element.length;
            for (var i = 0; i < length; i++) {
                adicionarItem(element[i]);
            }
        } else {
            adicionarItem(element);
        }

        caption.addClass(this._keys.caption);
        this._header.append(caption);
    }

    setToolbar(items) {
        let toolbar = $(`<div class="${this._keys.tools}">`);

        if(Array.isArray(items)) {
            var length = items.length;

            for (var i = 0; i < length; i++) {
                toolbar.append(items[i]);
            }   
        } else {
            toolbar.append(items);
        }

        this._header.append(toolbar);
    }

    appendContent(element) {
        this._body.append(element);
    }
}

export class MiniElement {
    static icon(glyphiconClass) {
        return `<i class="${glyphiconClass}"></i>`;
    }
    static img(url) {
        return $(`<img src="${url}" class="img-thumbnail">`);
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

export class Alert extends Element {
    constructor(msg, onRemove) {
        super('<div class="alert" role="alert">');

        this._message = msg;
        this._onRemove = onRemove;
        this._typeAlert = undefined;
        this._container = this.htmlTemplate;
    }

    _onChangeRemove() {
        this._container.remove();
        if(this._onRemove)
            this._onRemove();
    }

    _showMessage(elementMgs, timeout) {
        $('body').append(elementMgs.addClass("app-messages"));
        setTimeout(function () { elementMgs.remove(); }, timeout || 2000);
    }

    create() {
        let btnClose = $('<button type="button" class="close"><span aria-hidden="true">&times;</span></button>');

        btnClose.click(this._onChangeRemove.bind(this));

        if(this._typeAlert)
            this._container.addClass(this._typeAlert);
        
        this._container.append(btnClose);
        this._container.append(this._message);

        return this._container;
    }

    showDefault() {
        return this.create();
    }

    showError() {
        this._typeAlert = "alert-danger";
        this._showMessage(this.create(), 6000);
    }

    showWarning() {
        this._typeAlert = "alert-warning";
        return this._showMessage(this.create(), 8000);
    }

    showSuccess() {
        this._typeAlert = "alert-success";
        return this._showMessage(this.create(), 3000);
    }

}

export class GridLayout extends layout {
    constructor() {
        super('<div class="row">');
    }

    addColunm(size, element) {
        let colunm = $('<div>');

        colunm.addClass(`col-md-${size}`);
        colunm.append(element);
        super.append(colunm);
    }
}

export class refreshButton extends Button {
    constructor(onClick) {
        super();
        this.customStyles();
        this.click(onClick);

        return super.getHtml();
    }

    customStyles() {
        let btnClass = Metronic.Button;

        super.setId("btnRefresh");
        super.addClass([
            btnClass.btn,
            btnClass.formCircle,
            btnClass.icon,
            btnClass.bgDefault
        ].join(' '));
        super.setTitle("Atualizar");
        super.setGlyphicon(Metronic.Icon.refresh);
    }

    click(onClick) {
        super.onClick(function () {
            if (onClick !== undefined) {
                onClick();
            } else {
                throw "onClick is not defined.";
            }
        }); 
    }
}

export class PortletDefault extends Portlet {
    constructor(options) {
        super();
        this._options = options;

        this._validation();
        this.portlet();
    }

    _validation() {
        if (!this._options)
            throw new Error("options is undefined");

        if (!(this._options.title && (typeof this._options.title == "string")))
            throw new Error("Parameter 'title' is null or not set to string.");

        if (!(this._options.icon && (typeof this._options.icon == "string")))
            throw new Error("Parameter 'icon' is null or not set to string.");
    }

    portlet() {
        let _settings = {
                title: Metronic.Portlet.captionSubject,
                titleFont: Metronic.Font.flamingo,
                titleCaptionFont: function () {
                    return [_settings.title, Metronic.Font.bold, Metronic.Font.uppercase, _settings.titleFont].join(' ');
                }
            },
            contents = [];

        function addIcon(icon) {
            var icon = $(MiniElement.icon(icon));
            icon.addClass(_settings.titleFont);
            contents.push(icon);
        }

        function addCaption(caption) {
            contents.push(createText(caption));
        }

        function createText(value) {
            return $(`<span class="${_settings.titleCaptionFont()}">`).text(value);
        }

        addIcon(this._options.icon);
        addCaption(this._options.title);
        super.setTitle(contents);
    }
}

export class Thumb extends Element {
    constructor(urlImage, showDialog, cssClass = '') {
        super('<a href="#">');

        this._showDialog = showDialog;
        this._urlImage = urlImage;
        this._cssClass = cssClass;
    }

    create() {
        let element = this.htmlTemplate;
        element.addClass('showThumb');
        element.addClass(this._cssClass);
        element.append(MiniElement.img(this.getUrlImage()));             

        if (this._showDialog && this.hasUrlImage()) {
            element.bind('click', this.showDialogImage);
        }  

        return element;
    }

    getUrlImage() {
        return this.hasUrlImage() 
            ? this._urlImage : this.getNoImageUrl();
    }

    hasUrlImage() {
        return this._urlImage != null && this._urlImage != 'noImage';
    }

    getNoImageUrl() {
        return "/assets/img/semFoto.png";
    }

    showDialogImage(event) {
        event.preventDefault();

        let url = $(this).find('img').attr('src');
        let view = $('<div id="thumbPreview" title="Pré-visualização de imagem"></div>')
        .append($("<img>").attr('src', url).addClass("img-thumbnail"))

        new Modal(undefined, view, undefined, { closebutton: true }).show();
    };
}