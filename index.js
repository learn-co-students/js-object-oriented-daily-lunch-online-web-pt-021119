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
    store.neighborhoods.push(this);
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
    store.customers.push(this);
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
    store.meals.push(this);
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
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
}