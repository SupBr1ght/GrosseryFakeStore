class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  
}

class Store {
  //  Клас Store наслідує класс Product
  constructor() {
    this.revenue = 0;
    this.products = []; // add products in the store
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

  findProduct(name){
    return this.products.find(product => product.name === name); // if this product are exist return this product
    
  }

  addProduct(name, price, quantity) { //sum existing products  if we don't have this product run updateProductQuantity
    if (price <= 0) {
      console.log("Invalid price");
      return;
    }
    if (quantity <= 0) {
      console.log("Invalid quantity");
      return;
    }
    let product = this.findProduct(name)
    if (product) {
      this.updateProductQuantity(product, quantity);
    } else {
      this.products.push(new Product(name, price, quantity));
      console.log(`Added new product: ${name}`);
    }
  }

  updateProductQuantity(product, quantity) { // update quantity of a products
    if (quantity <= 0) {
      console.log("Invalid quantity");
      return;
    }
    product.quantity += quantity
    console.log(`Updated ${product.name} quantity: ${product.quantity} pcs`);
  }

  sellProduct(product, amount){
    if(!product){
      console.log(`Product ${product.name} not found`);  // check if we have this product
      return
    }
    if(product.quantity < amount){ // If we have enough quantity
      console.log(`Not enough ${product.name} in stock`);
    } else{
      
      product.quantity -= amount; // Quantity that we have minus amount that client wants
      let totalPrice = amount * product.price; // find how much our product cost
      const date = new Date();
      let day = date.getDate().toString().padStart(2, '0');
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let year = date.getFullYear();
      let hours = date.getHours().toString().padStart(2, '0')
      let minutes = date.getMinutes().toString().padStart(2, '0')
// This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day} ${hours}:${minutes}`;
      this.salesHistory.push({name: product.name, amount: amount, totalPrice: totalPrice, date: currentDate})
      console.table(this.salesHistory);
      console.log(`Quantity of our ${product.name} is ${product.quantity}`);
    }
  }

}

const store = new Store();
const banana = new Product("Banana", 12, 10);
const apple = new Product("Apple", 3, 40);
store.products.push(banana, apple);
store.showProducts();
store.addProduct("Lemone", 10, 20);
console.table(store.products);
store.addProduct("Lemone", 10, 2);
store.addProduct("Mango", 10, 11)
store.sellProduct(store.findProduct("Lemone"), 4)  
