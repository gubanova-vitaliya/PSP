class Ajax {
    /**
     * Универсальный метод для GET/POST/PATCH/DELETE
     * @param {string} method - HTTP метод
     * @param {string} url - Адрес запроса
     * @param {object|null} data - Данные для отправки (для POST/PATCH)
     * @returns {Promise}
     */
    request(method, url, data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            
            if (data) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(xhr.responseText ? JSON.parse(xhr.responseText) : null);
                    } catch (e) {
                        reject(new Error('JSON parse error'));
                    }
                } else {
                    reject(new Error(`HTTP error ${xhr.status}`));
                }
            };
            
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.send(data ? JSON.stringify(data) : null);
        });
    }

    get(url) {
        return this.request('GET', url);
    }

    post(url, data) {
        return this.request('POST', url, data);
    }

    patch(url, data) {
        return this.request('PATCH', url, data);
    }

    delete(url) {
        return this.request('DELETE', url);
    }
}

export const ajax = new Ajax();