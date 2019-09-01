// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodIdCount = 0;
let mealIdCount = 0;
let customerIdCount = 0;
let deliveryIdCount = 0;

class Neighborhood {
  constructor (name) {
    this.name = name;
    this.id = ++neighborhoodIdCount;
  }
  deliveries() {}
  customers() {}
  meals() {}
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.id = ++customerIdCount;
    this.neighborhoodId = neighborhoodId;
  }
  deliveries(){}
  meals(){}
  totalSpent(){}
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealIdCount;
  }
  deliveries(){}
  customers(){}
  static byPrice(){}
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryIdCount;
  }
  meal(){}
  customer(){}
  neighborhood(){}
}