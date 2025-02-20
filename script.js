class Product {
  constructor(name, price, quantity, discount = 0) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.discount = discount;
  }
}

class Store {
  constructor() {
    this.revenue = 0;
    this.products = [];
    this.currency = "UAH";
    this.salesHistory = [];
  }

  showProducts() {
    this.products.forEach((product) => {
      console.log(
        `${product.name} - ${product.price} ${this.currency} (${product.quantity} pcs)`
      );
    });
  }

  findProduct(name) {
    return this.products.find((product) => product.name === name);
  }

  addProduct(name, price, quantity) {
    if (price <= 0 || quantity <= 0) {
      console.log("Invalid price or quantity");
      return;
    }
    let product = this.findProduct(name);
    if (product) {
      this.updateProductQuantity(product, quantity);
    } else {
      this.products.push(new Product(name, price, quantity));
      console.log(`Added new product: ${name}`);
    }
  }

  updateProductQuantity(product, quantity) {
    if (quantity <= 0) {
      console.log("Invalid quantity");
      return;
    }
    product.quantity += quantity;
    console.log(`Updated ${product.name} quantity: ${product.quantity} pcs`);
  }

  getFormattedDate() {
    const date = new Date();
    return (
      `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.` +
      `${date.getFullYear()} time - ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    );
  }

  recordSale(name, amount, totalSalePrice, date) {
    this.salesHistory.push({
      name,
      amount,
      totalSalePrice,
      date,
    });
  }

  showSalesHistory() {
    console.log("💲 Sales History:");
    this.salesHistory.forEach((sale) => {
      console.log(
        `${sale.date} | Sold ${sale.amount} x ${
          sale.name
        } for ${sale.totalSalePrice.toFixed(2)} ${this.currency}`
      );
    });
  }

  showTotalSale() {
    let totalSales = 0;
    let totalRevenue = 0;
    let today = this.getFormattedDate().split(" ")[0];

    for (let sale of this.salesHistory) {
      let saleDate = sale.date.split(" ")[0];
      if (saleDate === today) {
        totalSales += sale.amount;
        totalRevenue += sale.totalSalePrice;
      }
    }

    console.log(`📅 Sales for today (${today}):`);
    console.log(`🛒 Total products sold: ${totalSales}`);
    console.log(
      `💰 Total revenue: ${totalRevenue.toFixed(2)} ${this.currency}`
    );
  }

  sellProduct(product, amount) {
    if (!product) {
      console.log(`Product not found`);
      return;
    }
    if (product.quantity < amount) {
      console.log(`Not enough ${product.name} in stock`);
      return;
    }

    let pricePerUnit = product.price;
    let totalSalePrice = amount * pricePerUnit;

    if (product.discount > 0) {
      pricePerUnit *= 1 - product.discount / 100;
      totalSalePrice = parseFloat((amount * pricePerUnit).toFixed(2));

      console.log(
        `${product.name} продано зі знижкою ${
          product.discount
        }%: ${totalSalePrice.toFixed(2)} ${this.currency} (замість ${(
          amount * product.price
        ).toFixed(2)} ${this.currency})`
      );
    } else {
      console.log(
        `${product.name} продано без знижки: ${totalSalePrice.toFixed(2)} ${
          this.currency
        }`
      );
    }

    product.quantity -= amount;
    this.recordSale(
      product.name,
      amount,
      totalSalePrice,
      this.getFormattedDate()
    );
    console.log(`Залишок ${product.name}: ${product.quantity} шт.`);
  }

  setDiscount(discount, name) {
    const product = this.findProduct(name);
    if (!product || discount <= 0 || discount > 100) {
      console.log("Недійсна знижка!");
    } else {
      product.discount = discount;
      console.log(`✅ Знижка ${discount}% встановлена на ${name}`);
    }
  }

  filterAvailableProducts() {
    const filteredAvailableProducts = this.products.filter(
      (item) => item.quantity > 0
    );
    filteredAvailableProducts.forEach((item) =>
      console.log(`Доступні продукти є: ${item.name}`)
    );
  }

  sortByPrice(order) {
    let sortedProducts = [...this.products]; // Копіюємо масив, щоб не змінювати оригінальний

    if (order === "cheap") {
      sortedProducts.sort((a, b) => a.price - b.price);
      console.log("📉 Ціна товарів від дешевого до дорогого:");
    } else if (order === "expensive") {
      sortedProducts.sort((a, b) => b.price - a.price);
      console.log("📈 Ціна товарів від дорогого до дешевого:");
    } else {
      console.log(
        "❌ Помилка: Вкажіть 'cheap' або 'expensive' для сортування."
      );
      return;
    }

    sortedProducts.forEach((item) =>
      console.log(`- ${item.name}: ${item.price} ${this.currency}`)
    );
  }

  sortByDiscount() {
    let sortedByDiscountProducts = [...this.products].sort(
      (a, b) => b.discount - a.discount
    );
    console.log("🔽 Товари з найбільшою знижкою:");
    sortedByDiscountProducts.forEach((item) =>
      console.log(
        `-${item.name}: ${item.discount}% (${item.price} ${this.currency})`
      )
    );
  }

  filterByMaxPrice(max_price) {
    if (max_price <= 0 || isNaN(max_price)) {
      console.log("❌ Некоректна ціна! Введіть число більше за 0.");
      return;
    }

    const filteredByPrice = this.products.filter(
      (product) => product.price <= max_price
    );

    if (filteredByPrice.length === 0) {
      console.log(`⚠️ Немає товарів дешевших за ${max_price} ${this.currency}`);
    } else {
      console.log(`🛒 Ось доступні продукти до ${max_price} ${this.currency}:`);
      console.table(filteredByPrice); // Виводимо в таблиці
    }
  }

  updatePrice(name, newPrice) {
    let product = this.products.find((item) => item.name === name);

    if (!product) {
      console.log(`❌ Товар "${name}" не знайдено.`);
      return;
    }

    if (newPrice <= 0) {
      console.log(
        `⚠️ Помилка: ціна не може бути ${newPrice}. Введіть коректну суму.`
      );
      return;
    }

    product.price = newPrice;
    console.log(
      `✅ Ціна товару "${name}" оновлена: ${product.price} ${this.currency}`
    );
  }

  isStoreEmpty() {
    if (!this.products.length) {
      console.log(
        `😓 Sorry, we don't have any products in our store yet, but we'll fix this soon!`
      );
      return true; // Повертаємо true, якщо магазин порожній
    }
    return false; // Якщо є товари, повертаємо false
  }

  findMostExpensiveProduct() {
    if (this.isStoreEmpty()) return;
    const mostExpensive = this.products.reduce((max, product) => {
      return product.price > max.price ? product : max; // if b > a then b become a and to check with next value
    }, this.products[0]);
    console.log(
      `🤑 Most expensive product is 💲${mostExpensive.name}💲 for price ${mostExpensive.price} ${this.currency}`
    );
  }

  findCheapestProduct() {
    if(this.isStoreEmpty()) return;
    const mostCheapest = this.products.reduce((min, product) => {
      return product.price < min.price ? product : min; // if b < a then b become a and to check with next value
    }, this.products[0]);
    console.log(
      `🥶 Least expensive product is ❄️${mostCheapest.name}❄️ for price ${mostCheapest.price} ${this.currency}`
    );
  }
}

// Ініціалізація магазину
const store = new Store();
const banana = new Product("Banana", 12, 10);
const apple = new Product("Apple", 3, 40);
store.products.push(banana, apple);
store.updatePrice("Banana", 14);
store.filterByMaxPrice(40);
store.findMostExpensiveProduct();
store.findCheapestProduct();
