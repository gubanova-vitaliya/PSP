export class SberCardEditPage {
    constructor(productData, saveCallback, cancelCallback) {
        this.productData = productData;
        this.saveCallback = saveCallback;
        this.cancelCallback = cancelCallback;
        this.root = document.getElementById('app');
    }

    renderSberCardEdit() {
        this.root.innerHTML = `
            <div class="sber-edit-container">
                <div class="sber-edit-header">
                    <h2><i class="bi bi-pencil-square"></i> Редактирование продукта</h2>
                    <button id="sber-edit-back" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left"></i> Назад
                    </button>
                </div>
                
                <form id="sber-edit-form" class="sber-edit-form">
                    <div class="mb-3">
                        <label for="sber-edit-title" class="form-label">Название продукта</label>
                        <input type="text" class="form-control" id="sber-edit-title" 
                               value="${this.productData.title}" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="sber-edit-text" class="form-label">Краткое описание</label>
                        <textarea class="form-control" id="sber-edit-text" rows="3" required>${this.productData.text}</textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="sber-edit-details" class="form-label">Полное описание</label>
                        <textarea class="form-control" id="sber-edit-details" rows="5" required>${this.productData.details}</textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="sber-edit-image" class="form-label">Ссылка на изображение</label>
                        <input type="url" class="form-control" id="sber-edit-image" 
                               value="${this.productData.src}">
                        <div class="sber-image-preview mt-2">
                            <img src="${this.productData.src}" alt="Предпросмотр" class="img-thumbnail">
                        </div>
                    </div>
                    
                    <div class="sber-edit-actions">
                        <button type="button" id="sber-edit-cancel" class="btn btn-outline-danger">
                            <i class="bi bi-x-circle"></i> Отменить
                        </button>
                        <button type="submit" class="btn btn-sber-primary">
                            <i class="bi bi-check-circle"></i> Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Обработчики событий
        document.getElementById('sber-edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveChanges();
        });

        document.getElementById('sber-edit-cancel').addEventListener('click', () => {
            this.cancelCallback();
        });

        document.getElementById('sber-edit-back').addEventListener('click', () => {
            this.cancelCallback();
        });

        // Предпросмотр изображения
        document.getElementById('sber-edit-image').addEventListener('input', (e) => {
            const preview = document.querySelector('.sber-image-preview img');
            preview.src = e.target.value || this.productData.src;
        });
    }

    saveChanges() {
        const updatedProduct = {
            ...this.productData,
            title: document.getElementById('sber-edit-title').value,
            text: document.getElementById('sber-edit-text').value,
            details: document.getElementById('sber-edit-details').value,
            src: document.getElementById('sber-edit-image').value || this.productData.src
        };
        this.saveCallback(updatedProduct);
    }
}