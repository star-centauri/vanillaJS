export class MiniElement {
    static icon(glyphiconClass) {
        let icon = document.createElement('i');
        icon.className = glyphiconClass;
        return icon;
    }
}