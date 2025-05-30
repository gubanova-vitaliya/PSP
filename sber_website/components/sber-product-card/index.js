export class SberProductCardComponent {
    constructor(parent, closeAccountCallback, showDetailsCallback, editCallback) {
        this.parent = parent;
        this.closeAccountCallback = closeAccountCallback;
        this.showDetailsCallback = showDetailsCallback;
        this.editCallback = editCallback;
    }

    getSberCardHTML(productData) {
        return `
            <div class="sber-card" data-id="${productData.id}">
                <div class="sber-card-header">
                    <span class="sber-card-id">ID: ${productData.id}</span>
                    <button class="btn btn-sm btn-outline-primary sber-edit-btn">
                        <i class="bi bi-pencil"></i> Редактировать
                    </button>
                </div>
                <img src="${productData.src}" class="sber-card-img-top" alt="${productData.title}">
                <div class="sber-card-body">
                    <h5 class="sber-card-title">${productData.title}</h5>
                    <p class="sber-card-text">${productData.text}</p>
                    <div class="sber-card-actions">
                        <button class="btn btn-success sber-details-btn">Подробнее</button>
                        <button class="btn btn-danger sber-close-btn">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderSberProduct(productData) {
        const html = this.getSberCardHTML(productData);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const cardElement = this.parent.querySelector(`[data-id="${productData.id}"]`);
        
        cardElement.querySelector('.sber-edit-btn').addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Edit button clicked', productData);
            this.editCallback(productData);
        });
        
        cardElement.querySelector('.sber-close-btn').addEventListener('click', () => {
            this.closeAccountCallback(productData.id);
        });
        
        cardElement.querySelector('.sber-details-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showDetailsCallback(productData);
        });
    }
}