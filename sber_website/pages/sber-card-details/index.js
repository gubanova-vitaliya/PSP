export class SberProductDetailsPage {
    constructor(productData, backToProductsCallback) {
        this.productData = productData;
        this.backToProductsCallback = backToProductsCallback;
        this.root = document.getElementById('app');
    }

    renderSberProductDetails() {
        this.root.innerHTML = `
            <div class="sber-container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="sber-detail-card">
                            <img src="${this.productData.src}" 
                                 class="sber-detail-img" 
                                 alt="${this.productData.title}">
                            <div class="sber-detail-body">
                                <h2 class="sber-detail-title">${this.productData.title}</h2>
                                <p class="sber-detail-text">${this.productData.details}</p>
                                <button id="sber-back-btn" class="btn sber-btn sber-btn-secondary">
                                    Вернуться к продуктам
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('sber-back-btn').addEventListener('click', () => {
            this.backToProductsCallback();
        });
    }
}
