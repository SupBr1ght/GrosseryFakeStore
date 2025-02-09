// let store =  {
//     revenue: 0,
//     currency: 'UAH',
//     products: [
//         { name: "Apple", price: 10, quantity: 5, currency: 'UAH'},
//         { name: "Banana", price: 8, quantity: 7, currency: 'UAH'},
//         { name: "Orange", price: 12, quantity: 4, currency: 'UAH'}
//     ],

//     // showProducts() {
//     //     this.products.forEach(product => { // It's iterating over all properties and values
//     //         let convertedPrice = this.convertPrice(product.price);
//     //         console.log(`${product.name} - ${convertedPrice} ${this.currency} (${product.quantity} pcs)`);
//     //     });
//     // },   
//     // sellProduct(productName, amount){
//     //     let product = this.products.find(product => product.name === productName); // check is we have this product
       
//     //     if(!product){
//     //         console.log('Product not found');
//     //         return
//     //     }
//     //     if(amount <= 0){
//     //         console.log('Invalid amount');
//     //         return;
//     //     }
//     //     if(amount === 1){
//     //         console.log(`Selling only 1 piece of ${product.name}`);
//     //     }
//     //     if(product.quantity < amount){ // if your product is not enough to sell
//     //         console.log(`Not enough ${product.name}`);
//     //         return
//     //     } 
//     //     else {
//     //         product.quantity -= amount; // find the rest of your product
//     //         this.updateRevenue(amount, product.price)
//     //     }
//     // },
//     // updateRevenue(amount, price){
//     //     this.revenue += amount * price; // to know how much of product we sell
//     //     console.log(`Revenue is updated: ${this.revenue} UAH`);
//     //     return
//     // },
//     // addProduct(name, price, quantity){
//     //     if(price <=  0){
//     //         console.log('Invalid price');
//     //         return;
//     //     }
//     //     if(quantity <= 0){
//     //         console.log('Invalid quantity');
//     //         return;
//     //     }
//     //     let existingProduct = this.products.find(product => product.name === name); // if this product are exist
//     //     if (existingProduct) {
//     //         existingProduct.quantity += quantity;
//     //         console.log(`Updated ${name} quantity: ${existingProduct.quantity} pcs`);
//     //     } else {
//     //         this.products.push({ name, price, quantity, currency: "UAH" });
//     //         console.log(`Added new product: ${name}`);
//     //     }
//     // },
//     // setCurrency(currency){
//     //     if(!['UAH', 'USD', 'EUR'].includes(currency)){
//     //         console.log('Invalid currency');
//     //         return;
//     //     }

//     //     this.currency = currency
//     //     console.log(`Currency changed to ${this.currency}`);
//     // },
//     // convertPrice(price){
//     //     switch (this.currency) {
//     //         case 'EUR':
//     //             return (price * 0.027).toFixed(2);
//     //         case 'USD':
//     //             return (price * 0.025).toFixed(2);
//     //         default:
//     //             return price;
//     //     }
//     // } 

// }
// // const date = new Date();

// // let day = date.getDate().toString().padStart(2, '0');
// // let month = (date.getMonth() + 1).toString().padStart(2, '0');
// // let year = date.getFullYear();
// // let hours = date.getHours().toString().padStart(2, '0')
// // let minutes = date.getMinutes().toString().padStart(2, '0')
// // // This arrangement can be altered based on how we want the date's format to appear.
// // let currentDate = `${year}-${month}-${day} ${hours}:${minutes}`;
// // console.log(currentDate); 

// // store.setCurrency('EUR')
// // store.showProducts()


class Product{
    constructor(name, price, quantity){
        this.name = name 
        this.price = price
        this.quantity = quantity
    }
}

class Store{ //  Клас Store наслідує класс Product
    constructor(revenue, products, currency){
        this.revenue = 0
        this.products = []; // add products in the store
        this.currency = 'UAH'
    }
}

