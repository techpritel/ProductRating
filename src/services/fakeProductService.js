
import * as categoiresAPI from "./fakeCategoryService";
const products = [
  {
    _id: "5d5bcd5375af8bb30d00057a",
    productName: "Curtains",
    price: 54.93,
    category: {
      _id: "5d5bb46e75af8bb30d000578",
      categoryName: "Household"
    },
    numberInStocks: 5,
    productRating: 4
  },
  {
    _id: "5d5d0062345acf6958a5e2a9",
    productName: "Titan",
    price: 54.93,
    category: {
      _id: "5d5bb50b0e940230bcbdc1cf",
      categoryName: "Watches"
    },
    numberInStocks: 10,
    productRating: 4
  },
  {
    _id: "5d5d00ce345acf6958a5e2aa",
    productName: "LG",
    price: 600,
    category: {
      _id: "5d5ccc60eef8a730cc35daaf",
      categoryName: "TV"
    },
    numberInStocks: 5,
    productRating: 5
  },
  {
    _id: "5d5d00ea345acf6958a5e2ab",
    productName: "Samsung",
    price: 500,
    category: {
      _id: "5d5ccc60eef8a730cc35daaf",
      categoryName: "TV"
    },
    numberInStocks: 5,
    productRating: 5
  },
  {
    _id: "5d5d013d345acf6958a5e2ac",
    productName: "Microwave Oven",
    price: 508,
    category: {
      _id: "5d5bb46e75af8bb30d000578",
      categoryName: "Household"
    },
    numberInStocks: 4,
    productRating: 4
  },
  {
    _id: "5d5d016e345acf6958a5e2ad",
    productName: "Rolex",
    price: 65,
    category: {
      _id: "5d5bb50b0e940230bcbdc1cf",
      categoryName: "Watches"
    },
    numberInStocks: 8,
    productRating: 5
  },
  {
    _id: "5d5d01b7345acf6958a5e2ae",
    productName: "Iphone 6",
    price: 82,
    category: {
      _id: "5d5bb5330e940230bcbdc1d0",
      categoryName: "Smartphones"
    },
    numberInStocks: 12,
    productRating: 4.5
  },
  {
    _id: "5d5d01e3345acf6958a5e2af",
    productName: "Samsung Note8",
    price: 80,
    category: {
      _id: "5d5bb5330e940230bcbdc1d0",
      categoryName: "Smartphones"
    },
    numberInStocks: 12,
    productRating: 5
  },
  {
    _id: "5d5d021d345acf6958a5e2b0",
    productName: "Acer Aspire",
    price: 1000,
    category: {
      _id: "5d5bb4f80e940230bcbdc1ce",
      categoryName: "Computers"
    },
    numberInStocks: 15,
    productRating: 4
  },
  {
    _id: "5d5d023c345acf6958a5e2b1",
    productName: "Dell",
    price: 1500,
    category: {
      _id: "5d5bb4f80e940230bcbdc1ce",
      categoryName: "Computers"
    },
    numberInStocks: 10,
    productRating: 4.5
  },
  {
    _id: "5d5d0252345acf6958a5e2b2",
    productName: "Asus",
    price: 450,
    category: {
      _id: "5d5bb4f80e940230bcbdc1ce",
      categoryName: "Computers"
    },
    numberInStocks: 25,
    productRating: 3.5
  }
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find(m => m._id === id);
}

export function saveProduct(product) {
  let productInDb = products.find(m => m._id === product._id) || {};
  productInDb.productName = product.productName;
  productInDb.price = product.price;
  productInDb.category = categoiresAPI.categories.find(g => g._id === product.categoryId);
  productInDb.numberInStocks = product.numberInStocks

  if (!productInDb._id) {
    productInDb._id = Date.now().toString();
    products.push(productInDb);
  }

  return productInDb;
}

export function deleteProduct(id) {
  let productInDb = products.find(m => m._id === id);
  products.splice(products.indexOf(productInDb), 1);
  return productInDb;
}
