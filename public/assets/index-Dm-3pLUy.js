(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();class d{constructor(t,s,n){this.parent=t,this.closeAccountCallback=s,this.showDetailsCallback=n}getSberCardHTML(t){return`
            <div class="sber-card" style="width: 18rem;" data-id="${t.id}">
                <img src="${t.src}" 
     class="sber-card-img-top" 
     alt="${t.title}"
     onerror="this.src='/assets/images/placeholder.png'; this.alt='Изображение недоступно'">
                <div class="sber-card-body">
                    <h5 class="sber-card-title">${t.title}</h5>
                    <p class="sber-card-text">${t.text}</p>
                    <div class="sber-card-actions">
  <a href="#" class="btn btn-success sber-details-btn">Подробнее</a>
  <button class="btn btn-danger sber-close-btn">Удалить</button>
</div>
                </div>
            </div>
            `}renderSberProduct(t){const s=this.getSberCardHTML(t);this.parent.insertAdjacentHTML("beforeend",s);const n=this.parent.querySelector(`[data-id="${t.id}"]`);n.querySelector(".sber-close-btn").addEventListener("click",()=>{this.closeAccountCallback(t.id)}),n.querySelector(".sber-details-btn").addEventListener("click",e=>{e.preventDefault(),this.showDetailsCallback(t)})}}class o{constructor(t,s){this.productData=t,this.backToProductsCallback=s,this.root=document.getElementById("app")}renderSberProductDetails(){this.root.innerHTML=`
            <div class="sber-container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="sber-detail-card">
                            <img src="${this.productData.src}" 
                                 class="sber-detail-img" 
                                 alt="${this.productData.title}">
                            <div class="sber-detail-body">
                                <h2 class="sber-detail-title">${this.productData.title}</h2>
                                <p class="sber-detail-text">${this.productData.details}</p>
                                <button id="sber-back-btn" class="btn sber-btn sber-btn-secondary">
                                    Вернуться к продуктам
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,document.getElementById("sber-back-btn").addEventListener("click",()=>{this.backToProductsCallback()})}}class a{constructor(){this.root=document.getElementById("app"),this.bankProducts=this.getBankProductsData(),this.nextProductId=this.bankProducts.length+1}getBankProductsData(){return[{id:1,src:"https://cdn-icons-png.flaticon.com/512/196/196578.png",title:"СберПрайм",text:"Подписка на лучшие условия по кредитам и вкладам",details:"СберПрайм — это подписка, которая дает вам особые условия по кредитам, вкладам и другим финансовым продуктам."},{id:2,src:"https://cdn-icons-png.flaticon.com/512/3132/3132693.png",title:"Кэшбэк до 30%",text:"Вернем деньги за покупки у партнеров",details:"Получайте кэшбэк до 30% при оплате картой Сбербанка у наших партнеров."},{id:3,src:"https://cdn-icons-png.flaticon.com/512/2489/2489756.png",title:"Ипотека 5%",text:"Льготная ипотека для семей с детьми",details:"Специальная ипотечная программа для семей с детьми по ставке от 5% годовых."},{id:4,src:"https://cdn-icons-png.flaticon.com/512/2721/2721614.png",title:"Инвестиции",text:"Начните инвестировать от 1000 рублей",details:"Платформа для инвестиций с минимальным порогом входа и обучающими материалами."},{id:5,src:"https://cdn-icons-png.flaticon.com/512/2583/2583344.png",title:"Страхование",text:"Защита для вас и вашей семьи",details:"Различные программы страхования жизни, здоровья и имущества."},{id:6,src:"https://cdn-icons-png.flaticon.com/512/2553/2553629.png",title:"Бизнес онлайн",text:"Все для предпринимателей",details:"Комплексные решения для бизнеса: расчётный счёт, эквайринг, кредиты."}]}removeBankProduct(t){this.bankProducts=this.bankProducts.filter(s=>s.id!==t),this.renderBankProducts()}showProductDetails(t){this.root.innerHTML="",new o(t,()=>this.renderSberMain()).renderSberProductDetails()}addNewBankProduct(){if(this.bankProducts.length===0)return;const t=this.bankProducts[this.bankProducts.length-1],s={...t,id:this.nextProductId++,title:`${t.title} (Дополнительный пакет)`};this.bankProducts.push(s),this.renderBankProducts()}renderBankProducts(){const t=document.getElementById("sber-products-container");t.innerHTML="",this.bankProducts.forEach(s=>{new d(t,e=>this.removeBankProduct(e),e=>this.showProductDetails(e)).renderSberProduct(s)})}renderSberMain(){this.root.innerHTML=`
            <div class="d-flex justify-content-end mb-3">
                <button id="add-product-btn" class="btn sber-btn sber-btn-primary">
                    + Добавить банковский продукт
                </button>
            </div>
            <div id="sber-products-container" class="d-flex flex-wrap justify-content-center"></div>
        `,this.renderBankProducts(),document.getElementById("add-product-btn").addEventListener("click",()=>{this.addNewBankProduct()})}}const l=new a;l.renderSberMain();
