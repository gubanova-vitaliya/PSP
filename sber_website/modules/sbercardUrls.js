class SberCardUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getSberCards() {
        return `${this.baseUrl}/sbercards`;
    }

    getSberCardById(id) {
        return `${this.baseUrl}/sbercards/${id}`;
    }

    createSberCard() {
        return `${this.baseUrl}/sbercards`;
    }

    removeSberCardById(id) {  
        return `${this.baseUrl}/sbercards/${id}`;
    }

    updateSberCardById(id) {  
        return `${this.baseUrl}/sbercards/${id}`;
    }
}

export const sbercardUrls = new SberCardUrls();