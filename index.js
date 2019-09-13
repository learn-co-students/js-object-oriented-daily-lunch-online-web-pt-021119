let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };


let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

// returns a list of all deliveries placed in a neighborhood
  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal());
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

//returns all the deliveries that customer has received
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

//returns all meals that a customer has ordered
  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }

//returns the total amount that the customer has spent on food.
  totalSpent(){
    return this.meals().reduce(function (accumulator, meal){
      return accumulator + meal.price;
    }, 0);
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort(function (meal1, meal2){
      return meal2.price - meal1.price
    });
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  };

  meal(){
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer(){
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}