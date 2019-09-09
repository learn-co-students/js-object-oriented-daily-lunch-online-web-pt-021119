// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
neighborhoodId = 0;
mealId = 0;
customerId = 0;
deliveryId = 0;

class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.neighborhoodId == this.id;
    });
  }

  customers(){
    return store.customers.filter(customer => {
      return customer.neighborhoodId == this.id
    });
  }

  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal());
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  }
}

class Customer{
  constructor(name, neighborhood){
    this.id = ++customerId;
    this.name = name;
    this.neighborhoodId = neighborhood
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.customerId == this.id;
    });
  }

  meals(){
    return this.deliveries().map(delivery => {
      return delivery.meal();
    })
  }

  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }

}

class Meal{
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id;
    });
  }

  customers(){
    return this.deliveries().map(delivery => {
      return delivery.customer();
    })
  }

  static byPrice(){
    return [...store.meals].sort((a, b) => b.price - a.price);
  }

}

class Delivery{
  constructor(meal, neighborhood, customer){
    this.id = ++deliveryId;
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }

  customer(){
    return store.customers.find(customer => {
      return customer.id === this.customerId;
    });
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => {
      return neighborhood.id === this.neighborhoodId;
    });
  }




}
