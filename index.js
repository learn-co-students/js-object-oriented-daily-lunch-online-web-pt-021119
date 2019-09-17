// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 1;
let customerId = 1;
let mealId = 1;
let deliveryId = 1;

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name 
    
    store.neighborhoods.push(this)
  }
  customers() {
    return store.customers.filter(function(customer) {return customer.neighborhoodId === this.id}.bind(this))
  }
  
  deliveries() {
    return store.deliveries
    .filter(delivery => delivery.neighborhoodId === this.id);
  }

  meals() {
    const meals = [];
    this.deliveries().forEach(function(delivery) {
      if (meals.includes(delivery.meal()) === false) {meals.push(delivery.meal())}
    })
    return meals;
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.name = name 
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this);
  }
  
  deliveries() {
    return store.deliveries.filter(function(delivery) {return delivery.customerId === this.id}.bind(this))
  }

  meals() {
    return this.deliveries().map(function(delivery) {return delivery.meal()})
  }

  totalSpent() {
    return this.meals().reduce(function(subtotal, meal) {
      return subtotal + meal.price;
    }, 0)
  }
  
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(delivery => delivery.meal().id === this.id)
  }
  
  customers() {
    return this.deliveries().map(function(delivery) {
      return delivery.customer()})
  }

  static byPrice() {
    let meals = store.meals.slice();
    meals.sort(function(meal1, meal2) {
      return meal2.price - meal1.price;
    })
    return meals;
  }
  
}

class Delivery {
  constructor(mealId, neighborhoodId,  customerId){
    this.id = deliveryId++;
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    
    store.deliveries.push(this);
  }
   meal() {
    return store.meals.find(meal => this.mealId === meal.id)
  
  }
  neighborhood() {
    return store.neighborhoods.find(function(neighborhood){return neighborhood.id ===this.neighborhoodId}.bind(this))
  }
  
  customer() {
    return store.customers.find(function(customer){return customer.id === this.customerId}.bind(this))
  }
}






