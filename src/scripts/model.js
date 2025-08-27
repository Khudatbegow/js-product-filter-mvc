export class Model {
  constructor(url = "../../src/db/data.json") {
    this.URL = url;
    this.data = [];
  }

  async getData() {
    try {
      const response = await fetch(this.URL);
      if (!response.ok) throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      const data = await response.json();
      this.data = data;
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return null;
    }
  }
}
