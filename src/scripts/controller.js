import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model("../../src/db/data.json");
const view = new View();

init();

async function init() {
  await model.getData();
  view.renderProducts(model.data);
  setupEventListeners();
}

function setupEventListeners() {
  view.sortCategory.addEventListener("change", sortProduct);
  view.sortType.addEventListener("change", sortProduct);
  view.sortDirection.addEventListener("change", sortProduct);
  view.searchInput.addEventListener("input", filterProducts);
}

function sortProduct() {
  const sortingValues = view.getSortingElementsValue();
  const sortingData = model.sortingProducts(sortingValues);
  view.renderProducts(sortingData);
}

function filterProducts() {
  const inputValue = this.value.toLowerCase();
  model.filterSearch(inputValue);
  sortProduct();
}
