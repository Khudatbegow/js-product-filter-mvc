export class Model {
  constructor(url = "../../src/db/data.json") {
    this.URL = url;
    this.data = [];
    this.allData = [];
  }

  async getData() {
    try {
      const response = await fetch(this.URL);
      if (!response.ok) throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      const data = await response.json();
      this.data = data;
      this.allData = data;
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return null;
    }
  }

  sortingProducts({ sortCategory, sortType, sortOrder }) {
    let filteredData = [];

    if (sortCategory !== "all") {
      filteredData = this.allData.filter((item) => item.category === sortCategory);
    } else {
      filteredData = [...this.allData];
    }

    return filteredData.sort((a, b) => {
      switch (sortType) {
        case "date": {
          return sortOrder === "desc"
            ? Date.parse(a.date) - Date.parse(b.date)
            : Date.parse(b.date) - Date.parse(a.date);
        }
        case "name": {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (sortOrder === "desc") {
            if (nameA < nameB) return 1;
            else if (nameA > nameB) return -1;
            else return 0;
          } else if (sortOrder === "asc") {
            if (nameA > nameB) return 1;
            else if (nameA < nameB) return -1;
            else return 0;
          }
        }
        case "price": {
          const priceA = a.price;
          const priceB = b.price;
          return sortOrder === "desc" ? priceA - priceB : priceB - priceA;
        }
      }
    });
  }

  filterSearch(inputValue) {
    if (inputValue.trim() === "") this.allData = [...this.data];
    this.allData = this.data.filter((item) => item.name.toLowerCase().includes(inputValue));
  }

  resetFilter({ sortCategory, sortType, sortOrder, searchInput }) {
    sortCategory.value = "all";
    sortType.value = "name";
    sortOrder.value = "desc";
    searchInput.value = "";
  }

  updateURL({ sortCategory, sortType, sortOrder }) {
    const urlParams = new URLSearchParams();
    urlParams.set("sortCategory", sortCategory);
    urlParams.set("sortType", sortType);
    urlParams.set("sortOrder", sortOrder);

    window.history.replaceState(null, null, `?${urlParams.toString()}`);
  }

  updateFromURL({ sortCategory, sortType, sortOrder }) {
    const urlParams = new URLSearchParams(window.location.search);

    const sortCategoryValue = urlParams.get("sortCategory") || "all";
    const sortTypeValue = urlParams.get("sortType") || "price";
    const sortOrderValue = urlParams.get("sortOrder") || "asc";

    sortCategory.value = sortCategoryValue;
    sortType.value = sortTypeValue;
    sortOrder.value = sortOrderValue;
  }
}
