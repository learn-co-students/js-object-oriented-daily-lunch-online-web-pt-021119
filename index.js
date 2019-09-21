let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;

    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter( 
        function(delivery) { 
            return delivery.neighborhoodId === this.id }.bind(this) );
  }

  customers(){
    return store.customers.filter( 
        function(customer) { 
            return customer.neighborhoodId === this.id }.bind(this) );
  }

  meals(){
    const mealArray = store.deliveries.filter(function(delivery){return delivery.neighborhoodId == this.id}.bind(this));
    const neighMeal = mealArray.map(deal => delivery.meal);
    return neighMeal;
  }

}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;

    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter( 
        function(delivery) { 
            return delivery.customerId === this.id }.bind(this) );
  }

  meals(){
    return store.deliveries.filter(
        fuction(delivery){
            ret
        });
  }

  totalSpent(){
    const prices = store.meals.filter(function(meal){return meal.price});
    const amount = (ele1, ele2) => ele1 + ele2;
    const total = prices.reduce(amount);
    return total;
  }

}

class Meal {
    constructor(title, price){
        this.title = title;
        this.price = price;
        this.id = ++meal.id; 

        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id}.bind(this));
    }

    customers() {
        return deliveries.map(
            function(delivery){return delivery.customerId}));
    }

    static byPrice() { return store.meals.sort((a, b) => b.price - a.price); }

}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
      this.mealId = mealId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.id = ++deliveryId;
  
      store.deliveries.push(this);
    }
          
    meal(){
            return store.meals.find(
            function(meal){
                return meal.id === this.mealId;
            }.bind(this));
        }
          
        customer(){
            return store.customers.find(
            function(customer){
                return customer.id === this.customerId;
            }.bind(this));
        }

        neighborhood(){
            return store.neighborhoods.find(
                function(neighborhood){
                    return neighborhood.id === this.neighborhoodId;
                }.bind(this) );
            }
    }



    