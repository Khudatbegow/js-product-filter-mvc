import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model("../../src/db/data.json");
const view = new View();

init();

async function init() {
  await model.getData();
  view.renderProducts(model.data);
}
