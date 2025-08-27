export class View {
  selectors = {
    productsList: "[data-js-products-list]",
  };

  constructor() {
    this.productsList = document.querySelector(this.selectors.productsList);
  }

  renderProducts(products) {
    products.forEach(({ id, subtitle, name, price, date }) => {
      const HTMLMarkup = `
         <li class="products__item">
            <article class="card" data-id="${id}">
              <h2 class="card__category">${subtitle}</h2>
              <h3 class="card__name">${name}</h3>
              <p class="card__description">
                ${subtitle} - современное устройство с улучшенными характеристиками и стильным дизайном
              </p>
              <div class="card__price">${price}₽</div>
              <time class="card__date" datetime="${date}">Добавлено: ${date}</time>
            </article>
        </li>
        `;
      this.productsList.insertAdjacentHTML("beforeend", HTMLMarkup);
    });
  }
}
