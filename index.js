// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter( function(delivery) {
      return delivery.neighborhoodId === this.id
    }.bind(this)
  );
  }

  customers(){
    return store.customers.filter( function(customer) {
      return customer.neighborhoodId === this.id
    }.bind(this)
  );
  }

  meals(){
    const mealArr = this.deliveries().map(delivery => delivery.mealId);
    const mealsArray = store.meals.filter(meal => mealArr.includes(meal.id));
    return mealsArray;
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter( function(delivery) { return delivery.customerId === this.id }.bind(this) );
  }

  meals(){
    return this.deliveries().map( delivery => delivery.meal() );
  }

  totalSpent(){
    const mealPrices = this.meals().map(meal => meal.price);
    const total = mealPrices.reduce((acc, amount) => acc + amount);
    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter( function(delivery) { return delivery.mealId === this.id }.bind(this) );
  }


  customers(){
    return this.deliveries().map( delivery => delivery.customer() );
  }

  static byPrice(){
    const byPriceArr = [...store.meals].sort((a, b) => b.price - a.price );
    return byPriceArr;
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId;
    }.bind(this)
  )
  }
  customer() {
    return store.customers.find( function(customer) {
      return customer.id === this.customerId;
     }.bind(this)
   );
 }

  neighborhood() {
    return store.neighborhoods.find( function(neighborhood) {
      return neighborhood.id === this.neighborhoodId;
     }.bind(this)
   );
  }
}
