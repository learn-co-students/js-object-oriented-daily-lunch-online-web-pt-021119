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
  deliveries() {
    return store.deliveries
      .filter(delivery => delivery.neighborhoodId === this.id);
  }
  customers() {
    return this.deliveries()
      .map(delivery => store.customers
        .find(customer => customer.id === delivery.customerId))
      .filter(onlyUnique)
  }
  meals() {
    return this.deliveries()
      .map(delivery => store.meals
        .find(meal => meal.id === delivery.mealId))
      .filter(onlyUnique)
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.id = ++customerIdCount;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries
      .filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries()
      .map(delivery => store.meals
        .find(meal => delivery.mealId === meal.id))
  }
  totalSpent(){
    const result = (total, obj) => {return total + obj.price};
    return this.meals()
      .reduce(result, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealIdCount;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries
      .filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    return this.deliveries()
      .map(delivery =>store.customers
        .find(customer => customer.id === delivery.customerId))
  }
  static byPrice(){
    return store.meals
      .sort((a, b) => b.price - a.price)
  }
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

//helper functions

//function to use in filter to return unique values
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}