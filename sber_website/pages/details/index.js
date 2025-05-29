export class DetailsPage {
    constructor(data, backCallback, editCallback) {
        this.data = data;
        this.backCallback = backCallback;
        this.editCallback = editCallback; // Новый callback для редактирования
        this.root = document.getElementById('app');
    }

    render() {
        this.root.innerHTML = `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <img src="${this.data.src}" class="card-img-top" alt="${this.data.title}">
                            <div class="card-body">
                                <h2 class="card-title">${this.data.title}</h2>
                                <p class="card-text">${this.data.details}</p>
                                <div class="d-flex justify-content-between">
                                    <button id="back-btn" class="btn btn-primary">Назад</button>
                                    <button id="edit-btn" class="btn btn-warning">Редактировать</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('back-btn').addEventListener('click', () => {
            this.backCallback();
        });

        // Добавляем обработчик для кнопки редактирования
        document.getElementById('edit-btn').addEventListener('click', () => {
            this.editCallback(this.data); // Передаем текущие данные для редактирования
        });
    }
}