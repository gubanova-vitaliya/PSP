import { SberMainPage } from './pages/main/index.js';

class SberApp {
    constructor() {
        this.mainPage = new SberMainPage();
        this.mainPage.renderSberMain();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SberApp();
});