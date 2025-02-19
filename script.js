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
        `${sale.date} | Sold ${sale.amount} x ${sale.name} for ${sale.totalSalePrice.toFixed(2)} ${this.currency}`
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
    console.log(`💰 Total revenue: ${totalRevenue.toFixed(2)} ${this.currency}`);
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
        `${product.name} продано зі знижкою ${product.discount}%: ${totalSalePrice.toFixed(2)} ${this.currency} (замість ${(amount * product.price).toFixed(2)} ${this.currency})`
      );
    } else {
      console.log(
        `${product.name} продано без знижки: ${totalSalePrice.toFixed(2)} ${this.currency}`
      );
    }

    product.quantity -= amount;
    this.recordSale(product.name, amount, totalSalePrice, this.getFormattedDate());
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

  filterAvailableProducts(){
      const filteredAvailableProducts = (this.products.filter((item) => item.quantity > 0))
      filteredAvailableProducts.forEach((item) => console.log(`Доступні продукти є: ${item.name}`));
  }

  sortByPrice(order) {
    let sortedProducts = [...this.products]; // Копіюємо масив, щоб не змінювати оригінальний
  
    if (order === "cheap") {
      sortedProducts.sort((a, b) => a.price - b.price);
      console.log("📉 Ціна товарів від дешевого до дорогого:");
    } 
    else if (order === "expensive") {
      sortedProducts.sort((a, b) => b.price - a.price);
      console.log("📈 Ціна товарів від дорогого до дешевого:");
    } 
    else {
      console.log("❌ Помилка: Вкажіть 'cheap' або 'expensive' для сортування.");
      return;
    }
  
    sortedProducts.forEach((item) => console.log(`- ${item.name}: ${item.price} ${this.currency}`));
  }
  
}

// Ініціалізація магазину
const store = new Store();
const banana = new Product("Banana", 12, 10);
const apple = new Product("Apple", 3, 40);
store.products.push(banana, apple);

store.showProducts();
console.table(store.products);

store.setDiscount(15, "Banana");
store.sellProduct(store.findProduct("Banana"), 4);
store.showSalesHistory();
store.showTotalSale();
store.filterAvailableProducts("Banana");
store.sortByPrice("cheap")
