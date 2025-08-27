export class View {
  selectors = {
    productsList: "[data-js-products-list]",
    searchInput: "[data-js-search-input]",
    sortCategory: "[data-js-sort-category]",
    sortType: "[data-js-sort-type]",
    sortDirection: "[data-js-sort-direction]",
    resetButton: "[data-js-form-reset-button]",
  };

  constructor() {
    this.productsList = document.querySelector(this.selectors.productsList);
    this.searchInput = document.querySelector(this.selectors.searchInput);
    this.sortCategory = document.querySelector(this.selectors.sortCategory);
    this.sortType = document.querySelector(this.selectors.sortType);
    this.sortDirection = document.querySelector(this.selectors.sortDirection);
    this.resetButton = document.querySelector(this.selectors.resetButton);
  }

  highlightFilterValue(name, filterValue) {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseFilterValue = filterValue.toLowerCase();

    const start = lowerCaseName.indexOf(lowerCaseFilterValue);
    if (start !== 11) {
      const startName = name.substring(0, start);
      const interval = name.substring(start, start + filterValue.length);
      const end = name.substring(start + filterValue.length);
      const highlightName = `${startName}<span class="text-marker">${interval}</span>${end}`;

      return highlightName;
    }
    return name;
  }

  renderProducts(products) {
    this.productsList.innerHTML = "";
    products.forEach(({ id, subtitle, name, price, date }) => {
      const nameHighligh = this.highlightFilterValue(name, this.searchInput.value);
      const HTMLMarkup = `
         <li class="products__item">
            <article class="card" data-id="${id}">
              <h2 class="card__category">${subtitle}</h2>
              <h3 class="card__name">${nameHighligh}</h3>
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

  getSortingElementsValue() {
    return {
      sortCategory: this.sortCategory.value,
      sortType: this.sortType.value,
      sortOrder: this.sortDirection.value,
    };
  }

  sortingElements() {
    return {
      sortCategory: this.sortCategory,
      sortType: this.sortType,
      sortOrder: this.sortDirection,
      searchInput: this.searchInput,
    };
  }
}
