import { SberProductCardComponent } from '../../components/sber-product-card/index.js';
import { SberProductDetailsPage } from '../sber-card-details/index.js';

export class SberMainPage {
    constructor() {
        this.root = document.getElementById('app');
        this.bankProducts = this.getBankProductsData();
        this.nextProductId = this.bankProducts.length + 1;
    }

    getBankProductsData() {
        return [
            {
                id: 1,
                src: "https://cdn-icons-png.flaticon.com/512/196/196578.png",
                title: "СберПрайм",
                text: "Подписка на лучшие условия по кредитам и вкладам",
                details: "СберПрайм — это подписка, которая дает вам особые условия по кредитам, вкладам и другим финансовым продуктам."
            },
            {
                id: 2,
                src: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                title: "Кэшбэк до 30%",
                text: "Вернем деньги за покупки у партнеров",
                details: "Получайте кэшбэк до 30% при оплате картой Сбербанка у наших партнеров."
            },
            {
                id: 3,
                src: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
                title: "Ипотека 5%",
                text: "Льготная ипотека для семей с детьми",
                details: "Специальная ипотечная программа для семей с детьми по ставке от 5% годовых."
            },
            {
                id: 4,
                src: "https://cdn-icons-png.flaticon.com/512/2721/2721614.png",
                title: "Инвестиции",
                text: "Начните инвестировать от 1000 рублей",
                details: "Платформа для инвестиций с минимальным порогом входа и обучающими материалами."
            },
            {
                id: 5,
                src: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
                title: "Страхование",
                text: "Защита для вас и вашей семьи",
                details: "Различные программы страхования жизни, здоровья и имущества."
            },
            {
                id: 6,
                src: "https://cdn-icons-png.flaticon.com/512/2553/2553629.png",
                title: "Бизнес онлайн",
                text: "Все для предпринимателей",
                details: "Комплексные решения для бизнеса: расчётный счёт, эквайринг, кредиты."
            }
        ];
    }

    removeBankProduct(productId) {
        this.bankProducts = this.bankProducts.filter(item => item.id !== productId);
        this.renderBankProducts();
    }

    showProductDetails(productData) {
        this.root.innerHTML = '';
        const detailsPage = new SberProductDetailsPage(productData, () => this.renderSberMain());
        detailsPage.renderSberProductDetails();
    }

    addNewBankProduct() {
        if (this.bankProducts.length === 0) return;
        
        const lastProduct = this.bankProducts[this.bankProducts.length - 1];
        const newProduct = {
            ...lastProduct,
            id: this.nextProductId++,
            title: `${lastProduct.title} (Дополнительный пакет)`
        };
        
        this.bankProducts.push(newProduct);
        this.renderBankProducts();
    }

    renderBankProducts() {
        const productsContainer = document.getElementById('sber-products-container');
        productsContainer.innerHTML = '';
        
        this.bankProducts.forEach((product) => {
            const productCard = new SberProductCardComponent(
                productsContainer, 
                (id) => this.removeBankProduct(id),
                (data) => this.showProductDetails(data)
            );
            productCard.renderSberProduct(product);
        });
    }

    renderSberMain() {
        this.root.innerHTML = `
            <div class="d-flex justify-content-end mb-3">
                <button id="add-product-btn" class="btn sber-btn sber-btn-primary">
                    + Добавить банковский продукт
                </button>
            </div>
            <div id="sber-products-container" class="d-flex flex-wrap justify-content-center"></div>
        `;
        
        this.renderBankProducts();
        
        document.getElementById('add-product-btn').addEventListener('click', () => {
            this.addNewBankProduct();
        });
    }
}