class SberCardUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getSberCards() {
        return `${this.baseUrl}/SberCards`;
    }

    getSberCardById(id) {
        return `${this.baseUrl}/SberCard/${id}`;
    }

    createSberCard() {
        return `${this.baseUrl}/SberCard`;
    }

    removeSberCardById() {
        return `${this.baseUrl}/SberCards/${id}`;
    }

    updateSberCardById() {
        return `${this.baseUrl}/SberCards/${id}`;
    }
}

export const SberCardUrls = new SberCardUrls();