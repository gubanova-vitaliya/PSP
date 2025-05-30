export class SberButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    renderSberCard() {
        this.parent.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-primary">Hello world 4!</button>');
    }

}