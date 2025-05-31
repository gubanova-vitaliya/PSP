import { ajax } from "../../modules/ajax.js";
import { sbercardUrls } from "../../modules/sbercardUrls.js";

export class SberProductDetailsPage {
    constructor(productId, backCallback, editCallback) {
        this.productId = productId;
        this.backCallback = backCallback;
        this.editCallback = editCallback;
        this.root = document.getElementById('app');
        this.productData = null;
    }

    async loadProductData() {
        return new Promise((resolve, reject) => {
            ajax.get(sbercardUrls.getSberCardById(this.productId), (data, status) => {
                if (status >= 200 && status < 300 && data) {
                    this.productData = data;
                    resolve(data);
                } else {
                    reject(new Error(`Failed to load product data: ${status}`));
                }
            });
        });
    }

    async renderSberProductDetails() {
        try {
            await this.loadProductData();
            
            this.root.innerHTML = `
                <div class="sber-detail-container">
                    <button id="sber-back-btn" class="btn btn-sber-outline mb-4">
                        <i class="bi bi-arrow-left"></i> Назад к результатам
                    </button>
                    
                    <div class="sber-detail-card">
                        <img src="${this.productData.src}" 
                             class="sber-detail-img" 
                             alt="${this.productData.title}"
                             onerror="this.src='/assets/images/placeholder.png'">
                        <div class="sber-detail-body">
                            <h1 class="sber-detail-title">${this.productData.title}</h1>
                            <div class="sber-detail-meta">
                                <span class="badge bg-sber-primary">ID: ${this.productData.id}</span>
                            </div>
                            <p class="sber-detail-text">${this.productData.text}</p>
                            <div class="sber-detail-content">
                                <h3>Полное описание:</h3>
                                <p>${this.productData.details || 'Описание отсутствует'}</p>
                            </div>
                            ${this.editCallback ? `
                                <button id="sber-edit-btn" class="btn btn-sber-primary mt-3">
                                    <i class="bi bi-pencil"></i> Редактировать
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('sber-back-btn').addEventListener('click', () => {
                this.backCallback();
            });

            if (this.editCallback) {
                document.getElementById('sber-edit-btn').addEventListener('click', () => {
                    this.editCallback(this.productData);
                });
            }
        } catch (error) {
            console.error('Error loading product details:', error);
            this.root.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Ошибка загрузки данных</h4>
                    <p>${error.message}</p>
                    <button id="sber-back-btn" class="btn btn-sber-outline">
                        <i class="bi bi-arrow-left"></i> Вернуться назад
                    </button>
                </div>
            `;
            document.getElementById('sber-back-btn').addEventListener('click', () => {
                this.backCallback();
            });
        }
    }
}