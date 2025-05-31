import { SberProductCardComponent } from '../../components/sber-product-card/index.js';
import { SberProductDetailsPage } from '../sber-card-details/index.js';
import { SberCardEditPage } from '../sber-card-edit/index.js';
import { SberSearchResultsPage } from '../sber-search-results/index.js';
import { ajax } from "../../modules/ajax.js";
import { sbercardUrls } from "../../modules/sbercardUrls.js";


export class SberMainPage {
    constructor() {
        this.root = document.getElementById('app');
        this.bankProducts = [];
        this.nextProductId = 1;
        this.initializeData();
    }

    async initializeData() {
        try {
            const data = await this.getBankProductsData();
            this.bankProducts = data || [];
            this.nextProductId = this.bankProducts.length > 0 
                ? Math.max(...this.bankProducts.map(p => p.id)) + 1 
                : 1;
            this.renderSberMain();
        } catch (error) {
            console.error('Error initializing data:', error);
            this.root.innerHTML = '<p>Ошибка загрузки данных</p>';
        }
    }


    getBankProductsData() {
        return new Promise((resolve, reject) => {
            ajax.get(sbercardUrls.getSberCards(), (data, status) => {
                if (status >= 200 && status < 300) {
                    resolve(data);
                } else {
                    reject(new Error(`Failed to load data: ${status}`));
                }
            });
        });
    }
    renderData(data) {
        if (!data || !Array.isArray(data)) {
            console.error('Invalid data received:', data);
            return;
        }

        const productsContainer = document.getElementById('sber-products-container');
        if (!productsContainer) return;

        productsContainer.innerHTML = '';
        
        data.forEach((item) => {
            const productCard = new SberProductCardComponent(
                productsContainer,
                (id) => this.removeBankProduct(id),
                (data) => this.showProductDetails(data),
                (data) => this.showEditProduct(data)
            );
            productCard.renderSberProduct(item);
        });
    }
render() {
    this.parent.innerHTML = ''
    const html = this.getHTML()
    this.parent.insertAdjacentHTML('beforeend', html)

    this.getData()
}

    removeBankProduct(productId) {
        this.bankProducts = this.bankProducts.filter(item => item.id !== productId);
        this.renderBankProducts();
    }

    showProductDetails(productId) {
        this.root.innerHTML = '';
        const detailsPage = new SberProductDetailsPage(
            productId,
            () => this.renderSberMain(),
            (data) => this.showEditProduct(data.id)
        );
        detailsPage.renderSberProductDetails();
    }
    showEditProduct(productId) {
        const product = this.bankProducts.find(p => p.id === productId);
        if (!product) return;

        this.root.innerHTML = '';
        const editPage = new SberCardEditPage(
            product,
            (updatedCard) => {
                this.updateProduct(updatedCard);
                this.renderSberMain();
            },
            () => this.renderSberMain()
        );
        editPage.renderSberCardEdit();
    }
    updateProduct(updatedCard) {
        const index = this.bankProducts.findIndex(p => p.id === updatedCard.id);
        if (index !== -1) {
            this.bankProducts[index] = updatedCard;
        }
    }

    addNewBankProduct() {
        if (this.bankProducts.length === 0) return;
        
        const lastProduct = this.bankProducts[this.bankProducts.length - 1];
        const newProduct = {
            ...lastProduct,
            id: this.nextProductId++,
            title: `${lastProduct.title} (Дополнительный пакет)`
        };
        
        this.bankProducts.push(newProduct);
        this.renderBankProducts();
    }

    renderBankProducts() {
        const productsContainer = document.getElementById('sber-products-container');
        productsContainer.innerHTML = '';
        
        this.bankProducts.forEach((product) => {
            const productCard = new SberProductCardComponent(
                productsContainer, 
                (id) => this.removeBankProduct(id),
                (id) => this.showProductDetails(id),
                (id) => this.showEditProduct(id)
            );
            productCard.renderSberProduct(product);
        });
    }

    renderSberMain() {
        this.root.innerHTML = `
            <div class="sber-main-container">
                <div class="sber-search-section">
                    <form id="sber-search-form" class="sber-search-form">
                        <div class="input-group mb-4">
                            <input type="text" id="sber-search-input" class="form-control" 
                                   placeholder="Поиск по названию или ID">
                            <button class="btn btn-sber-primary" type="submit">
                                <i class="bi bi-search"></i> Найти
                            </button>
                        </div>
                    </form>
                </div>
                
                <div class="d-flex justify-content-between mb-3">
                    <h2>Банковские продукты</h2>
                    <button id="add-product-btn" class="btn btn-sber-primary">
                        <i class="bi bi-plus-circle"></i> Добавить продукт
                    </button>
                </div>
                
                <div id="sber-products-container" class="row"></div>
            </div>
        `;
        
        document.getElementById('sber-search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById('sber-search-input').value.trim();
            if (searchTerm) {
                this.searchProduct(searchTerm);
            }
        });
        
        this.renderBankProducts();
        
        document.getElementById('add-product-btn').addEventListener('click', () => {
            this.addNewBankProduct();
        });
    }
    searchProduct(searchTerm) {
        const results = this.bankProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.id.toString() === searchTerm
        );
        
        this.root.innerHTML = '';
        const searchPage = new SberSearchResultsPage(
            results,
            () => this.renderSberMain(),
            (id) => this.showProductDetails(id)
        );
        searchPage.renderSearchResults();
    }
}