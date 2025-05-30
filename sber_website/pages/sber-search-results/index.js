export class SberSearchResultsPage {
    constructor(results, backCallback, showDetailsCallback) {
        this.results = results;
        this.backCallback = backCallback;
        this.showDetailsCallback = showDetailsCallback;
        this.root = document.getElementById('app');
    }

    renderSearchResults() {
        this.root.innerHTML = `
            <div class="sber-search-results">
                <div class="sber-search-header">
                    <button id="sber-search-back" class="btn btn-sber-outline">
                        <i class="bi bi-arrow-left"></i> Назад
                    </button>
                    <h2>Результаты поиска: найдено ${this.results.length} продуктов</h2>
                </div>
                
                ${this.results.length ? `
                    <div class="sber-results-grid">
                        ${this.results.map(product => `
                            <div class="sber-result-card" data-id="${product.id}">
                                <img src="${product.src}" class="sber-result-image" alt="${product.title}">
                                <div class="sber-result-body">
                                    <h3>${product.title}</h3>
                                    <p>${product.text}</p>
                                    <button class="btn btn-sber-sm sber-result-details">
                                        <i class="bi bi-eye"></i> Подробнее
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="sber-no-results">
                        <i class="bi bi-search"></i>
                        <p>Ничего не найдено. Попробуйте изменить запрос.</p>
                    </div>
                `}
            </div>
        `;

        document.getElementById('sber-search-back').addEventListener('click', () => {
            this.backCallback();
        });

        this.results.forEach(product => {
            const card = this.root.querySelector(`.sber-result-card[data-id="${product.id}"]`);
            card.querySelector('.sber-result-details').addEventListener('click', () => {
                this.showDetailsCallback(product);
            });
        });
    }
}