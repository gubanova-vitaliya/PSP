import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ProductCardComponent } from '../../components/product-card/index.js';
import { DetailsPage } from '../details/index.js';

export class MainPage {
    constructor() {
        this.root = document.getElementById('app');
        this.data = [];
        this.nextId = 1;
        this.pageRoot = null;
    }

    async getData() {
    try {
        const data = await ajax.get(stockUrls.getStocks());
        this.data = data || [];
        this.nextId = this.data.length > 0 
            ? Math.max(...this.data.map(item => item.id)) + 1 
            : 1;
        return this.data;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        this.data = [];
        return this.data;
    }
}

    async render() {
        this.root.innerHTML = `
            <div class="controls">
                <button id="add-card-btn">Добавить карточку</button>
            </div>
            <div id="main-page"></div>
        `;
        
        try {
            await this.getData();
            this.renderData(this.data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.root.innerHTML += '<p class="error">Ошибка загрузки данных</p>';
        }
        
        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.addNewCard();
        });
    }


    renderData(items) {
        if (!items || !Array.isArray(items)) return;
        
        const pageRoot = document.getElementById('main-page');
        if (!pageRoot) return;
        
        pageRoot.innerHTML = '';
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(
                pageRoot,
                (id) => this.deleteCard(id),
                (data) => this.showDetails(data)
            );
            productCard.render(item);
        });
    }

    deleteCard(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.renderData(this.data);
    }

    showDetails(data) {
        this.root.innerHTML = '';
        const detailsPage = new DetailsPage(data, () => this.render());
        detailsPage.render();
    }

    addNewCard() {
        if (this.data.length === 0) return;
        
        const lastCard = this.data[this.data.length - 1];
        const newCard = {
            ...lastCard,
            id: this.nextId++,
            title: `${lastCard.title} (копия)`
        };
        
        this.data.push(newCard);
        this.renderData(this.data);
    }

    async render() {
        this.root.innerHTML = `
            <div class="d-flex justify-content-end mb-3">
                <button id="add-card-btn" class="btn btn-primary">Добавить карточку</button>
            </div>
            <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
        `;
        
        this.pageRoot = document.getElementById('main-page');
        await this.getData();
        this.renderData(this.data);
        
        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.addNewCard();
        });
    }
}