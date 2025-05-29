export class EditPage {
    constructor(data, saveCallback, backCallback) {
        this.data = data;                 // Исходные данные карточки
        this.saveCallback = saveCallback; // Функция для сохранения изменений
        this.backCallback = backCallback; // Функция для возврата назад
        this.root = document.getElementById('app');
    }


    

    render() {
        this.root.innerHTML = `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card p-3">
                            <div class="form-group mb-3">
                                <label for="title-input" class="form-label">Название</label>
                                <input id="title-input" type="text" class="form-control" value="${this.data.title}">
                            </div>
                            <div class="form-group mb-3">
                                <label for="src-input" class="form-label">URL изображения</label>
                                <input id="src-input" type="text" class="form-control" value="${this.data.src}">
                            </div>
                            <div class="form-group mb-3">
                                <label for="details-textarea" class="form-label">Описание</label>
                                <textarea id="details-textarea" class="form-control" rows="5">${this.data.details}</textarea>
                            </div>
                            <button id="save-btn" class="btn btn-success me-2">Сохранить</button>
                            <button id="back-btn" class="btn btn-secondary">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Обработчик кнопки "Сохранить"
        document.getElementById('save-btn').addEventListener('click', () => {
            // Считываем новые значения из полей
            const updatedData = {
                title: document.getElementById('title-input').value.trim(),
                src: document.getElementById('src-input').value.trim(),
                details: document.getElementById('details-textarea').value.trim(),
            };

            // Можно добавить валидацию данных здесь, если нужно

            // Вызываем callback для сохранения изменений
            this.saveCallback(updatedData);
        });

        // Обработчик кнопки "Отмена" (назад)
        document.getElementById('back-btn').addEventListener('click', () => {
            this.backCallback();
        });
    }
}
