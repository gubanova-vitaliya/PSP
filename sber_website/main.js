import { SberMainPage } from './pages/main/index.js';

class SberApp {
    constructor() {
        try {
            const appElement = document.getElementById('app');
            if (!appElement) throw new Error('App container not found');
            
            this.mainPage = new SberMainPage();
            if (!this.mainPage) throw new Error('Failed to initialize MainPage');
        } catch (error) {
            console.error('Application initialization failed:', error);
            document.body.innerHTML = `
                <div class="error" style="padding: 20px; color: red;">
                    <h2>Application Error</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SberApp();
});