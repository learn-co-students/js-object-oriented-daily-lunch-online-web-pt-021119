// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  customers() {
    return store.customers.filter(
      function(customer) {
        return customer.neighborhoodId === this.id;
      }.bind(this)
    )
  }

  meals() {
    let mealsArray = this.deliveries().map(delivery => delivery.meal());

    let uniq = [...new Set(mealsArray)];
    return uniq;
  }
}

let customerId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    )
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
    // let mealArray = [];
    // let deliveries = this.deliveries();
    // let deliveryMeal;
    //
    // deliveries.forEach(
    //   function(delivery) {
    //     deliveryMeal = store.meals.find(
    //       function(meal) {
    //         return meal.id === delivery.mealId;
    //       }
    //     )
    //     mealArray.push(deliveryMeal);
    //   }
    // )
    //
    // return mealArray;
  }

  totalSpent() {
    let finalPrice = 0;
    let mealsArray = this.meals();

    mealsArray.forEach(
      function(meal) {
        return finalPrice += meal.price;
      }
    )
    return finalPrice;
  }
}

const Meal = (() => {
  let mealIds = 1;
  return class {
    constructor(title, price = 0) {
      this.id = mealIds++;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }

    static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
  };
})();

let deliveryId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return meal.id === this.mealId;
      }.bind(this)
    )
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return customer.id === this.customerId;
      }.bind(this)
    )
  }

  neighborhood() {
    return store.neighborhoods.find(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId;
      }.bind(this)
    )
  }
}
