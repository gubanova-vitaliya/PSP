export class SberProductCardComponent {
    constructor(parent, closeAccountCallback, showDetailsCallback) {
        this.parent = parent;
        this.closeAccountCallback = closeAccountCallback;
        this.showDetailsCallback = showDetailsCallback;
    }

    getSberCardHTML(productData) {
        return (
            `
            <div class="sber-card" style="width: 18rem;" data-id="${productData.id}">
                <img src="${productData.src}" 
     class="sber-card-img-top" 
     alt="${productData.title}"
     onerror="this.src='/assets/images/placeholder.png'; this.alt='Изображение недоступно'">
                <div class="sber-card-body">
                    <h5 class="sber-card-title">${productData.title}</h5>
                    <p class="sber-card-text">${productData.text}</p>
                    <div class="sber-card-actions">
  <a href="#" class="btn btn-success sber-details-btn">Подробнее</a>
  <button class="btn btn-danger sber-close-btn">Удалить</button>
</div>
                </div>
            </div>
            `
        );
    }
    
    renderSberProduct(productData) {
        const html = this.getSberCardHTML(productData);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const cardElement = this.parent.querySelector(`[data-id="${productData.id}"]`);
        cardElement.querySelector('.sber-close-btn').addEventListener('click', () => {
            this.closeAccountCallback(productData.id);
        });
        
        cardElement.querySelector('.sber-details-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showDetailsCallback(productData);
        });
    }
}