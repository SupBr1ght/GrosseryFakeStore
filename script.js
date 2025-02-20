/**
 * Represents new product in the shop
 */
class Product {
  /**
   *
   * @param {string} name - Name of the product.
   * @param {number} price - Price of the product.
   * @param {number} quantity - Quantity of products on the stock.
   * @param {number} [discount=0] - Sales on product in percent.
   */
  constructor(name, price, quantity, discount = 0) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.discount = discount;
  }
}

/**
 * Class that represents shop with goods.
 */
class Store {
  /**
   * Creates a new shop.
   */
  constructor() {
    this.revenue = 0;
    this.products = [];
    this.currency = "UAH";
    this.salesHistory = [];
  }

  /**
   * Displays list of products in our shop.
   */
  showProducts() {
    this.products.forEach((product) => {
      console.log(
        `${product.name} - ${product.price} ${this.currency} (${product.quantity} pcs)`
      );
    });
  }
  /**
   *
   * @param {string} name - Product name.
   * @returns {Product | undefined}  - Return found product or undefined, If we don't have this product.
   */
  findProduct(name) {
    return this.products.find((product) => product.name === name);
  }

  /**
   *
   * @param {string} name - Product name.
   * @param {string} price - Product price
   * @param {string} quantity - Product quantity
   */
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

  /**
   *
   * @param {Product} product - Object of product.
   * @param {number} quantity - Additional product quantity.
   */
  updateProductQuantity(product, quantity) {
    if (quantity <= 0) {
      console.log("Invalid quantity");
      return;
    }
    product.quantity += quantity;
    console.log(`Updated ${product.name} quantity: ${product.quantity} pcs`);
  }
  /**
   *
   * @returns {string} - Formatted date.
   */
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
  /**
   *
   * @param {string} name - Name of good.
   * @param {number} amount - Amount of good.
   * @param {number} totalSalePrice - Total price sum.
   * @param {string} date - Date when product where sold.
   */
  recordSale(name, amount, totalSalePrice, date) {
    this.salesHistory.push({
      name,
      amount,
      totalSalePrice,
      date,
    });
  }

  /**
   * Show history of sales.
   */
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
  /**
   * Show how much we sell for today.
   */
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
  /**
   * Sell products for sale or without.
   * @param {Product} product - Product for sell.
   * @param {string} amount - How much we want to sell.
   */
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
        `${product.name} to be sold for sale ${
          product.discount
        }%: ${totalSalePrice.toFixed(2)} ${this.currency} (замість ${(
          amount * product.price
        ).toFixed(2)} ${this.currency})`
      );
    } else {
      console.log(
        `${product.name} to be sold without sale: ${totalSalePrice.toFixed(
          2
        )} ${this.currency}`
      );
    }

    product.quantity -= amount;
    this.recordSale(
      product.name,
      amount,
      totalSalePrice,
      this.getFormattedDate()
    );
    console.log(`Rest ${product.name}: ${product.quantity} шт.`);
  }
  /**
   * Set the discount on the good.
   * @param {number} discount
   * @param {string} name
   */
  setDiscount(discount, name) {
    const product = this.findProduct(name);
    if (!product || discount <= 0 || discount > 100) {
      console.log("Discount isn't available!");
    } else {
      product.discount = discount;
      console.log(`✅ Discount ${discount}% is settled up on ${name}`);
    }
  }
  /**
   * Show to us which product's are available.
   */
  filterAvailableProducts() {
    const filteredAvailableProducts = this.products.filter(
      (item) => item.quantity > 0
    );
    filteredAvailableProducts.forEach((item) =>
      console.log(`Available products is: ${item.name}`)
    );
  }

  /**
   *
   * @param {string} order - In wich order we want to sort our prices:
   *  if from cheap to expensive enter "cheap" if from expensive to cheap  enter "expensive".
   */
  sortByPrice(order) {
    let sortedProducts = [...this.products]; // Копіюємо масив, щоб не змінювати оригінальний

    if (order === "cheap") {
      sortedProducts.sort((a, b) => a.price - b.price);
      console.log("📉 The price of goods ranges from cheap to expensive:");
    } else if (order === "expensive") {
      sortedProducts.sort((a, b) => b.price - a.price);
      console.log("📈 The price of goods ranges from expensive to cheap:");
    } else {
      console.log("❌ Error! Enter 'cheap' or 'expensive' for sort.");
      return;
    }

    sortedProducts.forEach((item) =>
      console.log(`- ${item.name}: ${item.price} ${this.currency}`)
    );
  }

  /**
   * Show good with biggest sale.
   */
  sortByDiscount() {
    let sortedByDiscountProducts = [...this.products].sort(
      (a, b) => b.discount - a.discount
    );
    console.log("🔽 Good with biggest sale:");
    sortedByDiscountProducts.forEach((item) =>
      console.log(
        `-${item.name}: ${item.discount}% (${item.price} ${this.currency})`
      )
    );
  }
  /**
   * Show good for biggest price
   * @param {number} max_price
   */
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
  /**
   * Update goood price.
   * @param {string} name - Name of good.
   * @param {number} newPrice - New price of good.
   * @returns {Product | string} - Good is undefined
   */
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
  /**
   * Check if the stock is empty
   * @returns {true | false} returns true if stock is empty otherwise false
   */
  isStoreEmpty() {
    if (!this.products.length) {
      console.log(
        `😓 Sorry, we don't have any products in our store yet, but we'll fix this soon!`
      );
      return true; // returns true, if stock is empty
    }
    return false; // If have goods, return false
  }

  /**
   * Show most expensive product
   */
  findMostExpensiveProduct() {
    if (this.isStoreEmpty()) return;
    const mostExpensive = this.products.reduce((max, product) => {
      return product.price > max.price ? product : max; // if b > a then b become a and to check with next value
    }, this.products[0]);
    console.log(
      `🤑 Most expensive product is 💲${mostExpensive.name}💲 for price ${mostExpensive.price} ${this.currency}`
    );
  }
  /**
   * Show most cheapest product
   */
  findCheapestProduct() {
    if (this.isStoreEmpty()) return;
    const mostCheapest = this.products.reduce((min, product) => {
      return product.price < min.price ? product : min; // if b < a then b become a and to check with next value
    }, this.products[0]);
    console.log(
      `🥶 Least expensive product is ❄️${mostCheapest.name}❄️ for price ${mostCheapest.price} ${this.currency}`
    );
  }
  /**
   * How much money we will have if we sold all the goods in our stock!
   */
  getTotalStockValue() {
    if (this.isStoreEmpty()) return;
    const totalStock = this.products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    console.log(
      `We'll sell all what we have in our stock for ${totalStock} ${this.currency}🤑🤑🤑🤑🤑🤑`
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
store.getTotalStockValue();
