export class SberProductDetailsPage {
    constructor(productData, backCallback) {
        this.productData = productData;
        this.backCallback = backCallback;
        this.root = document.getElementById('app');
    }

    renderSberProductDetails() {
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
                            <p>${this.productData.details}</p>
                        </div>
                        <button id="sber-edit-btn" class="btn btn-sber-primary mt-3">
                            <i class="bi bi-pencil"></i> Редактировать
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('sber-back-btn').addEventListener('click', () => {
            this.backCallback();
        });

        document.getElementById('sber-detail-edit').addEventListener('click', () => {
            this.editCallback(this.productData);
        });
    }
}