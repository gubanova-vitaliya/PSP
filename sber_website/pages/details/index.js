export class DetailsPage {
    constructor(data, backCallback, editCallback) {
        this.data = data;
        this.backCallback = backCallback;
        this.editCallback = editCallback;
        this.root = document.getElementById('app');
    }

    render() {
        this.root.innerHTML = this.getTemplate();
        this.setupEventListeners();
    }

    getTemplate() {
        return `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6">
                        <div class="card shadow-sm">
                            <div class="card-img-container">
                                <img src="${this.data.src || 'https://via.placeholder.com/300'}" 
                                     class="card-img-top" 
                                     alt="${this.data.title}"
                                     onerror="this.src='https://via.placeholder.com/300'">
                            </div>
                            <div class="card-body">
                                <h1 class="card-title mb-3">${this.data.title || 'Без названия'}</h1>
                                <div class="card-text mb-4">
                                    ${this.formatDetails(this.data.details)}
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button id="back-btn" class="btn btn-outline-primary">
                                        <i class="bi bi-arrow-left"></i> Назад
                                    </button>
                                    <button id="edit-btn" class="btn btn-primary">
                                        <i class="bi bi-pencil"></i> Редактировать
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    formatDetails(details) {
        if (!details) return '<p class="text-muted">Описание отсутствует</p>';
        return `<p>${details}</p>`;
    }

    setupEventListeners() {
        document.getElementById('back-btn').addEventListener('click', () => {
            this.backCallback();
        });

        document.getElementById('edit-btn').addEventListener('click', () => {
            this.editCallback({...this.data});
        });
    }
}