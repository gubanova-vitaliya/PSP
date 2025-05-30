export class SberButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    renderSberButton() {
        this.parent.insertAdjacentHTML(
            'beforeend', 
            '<button type="button" class="btn sber-btn sber-btn-primary">СберБанк Онлайн</button>'
        );
    }
}