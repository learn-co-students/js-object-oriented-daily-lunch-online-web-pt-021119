// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliverId = 0

class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    const deliveries = []
    return store.deliveries.filter(
      function(delivery) {
        if (delivery.neighborhoodId === this.id) {
          deliveries.push(delivery)
        }
        return deliveries;
      }.bind(this)
    )
  }

  customers() {
    const customers = []
    return store.customers.filter(
      function(customer) {
        if (customer.neighborhoodId === this.id) {
          customers.push(customer)
        }
        return customers
      }.bind(this)
    )
  }

  meals() {
    const meals = []
    for (const delivery of store.deliveries) {
      if (delivery.neighborhoodId === this.id) {
        meals.push(delivery.meal())
      }
    }
    return [...new Set(meals)]
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    const deliveries = []
    for (const delivery of store.deliveries) {
      if (delivery.customerId === this.id) {
        deliveries.push(delivery)
      }
    }
    return deliveries
  }

  meals() {
    const meals = []
    const deliveries = this.deliveries()
    for (const delivery of deliveries) {
      meals.push(delivery.meal())
    }
    return meals
  }

  totalSpent() {
    const reduceMealPrices = function(totalSpent, meal, index, orderedMeals) {
      return totalSpent + meal.price
    }

    return this.meals().reduce(reduceMealPrices, 0)
  }
}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  customers() {
    const customers = []
    for (const delivery of store.deliveries) {
      if (delivery.mealId === this.id) {
        customers.push(delivery.customer())
      }
    }
    return customers
  }

  deliveries() {
    const deliveries = []
    for (const delivery of store.deliveries) {
      if (delivery.mealId === this.id) {
        deliveries.push(delivery)
      }
    }
    return deliveries
  }

  static byPrice() {
    return store.meals.sort(
      function(mealA, mealB) {
        return mealB.price - mealA.price
      }.bind(this)
    )
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliverId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    const result = store.meals.filter(
      function(meal) {
        return meal.id === this.mealId
      }.bind(this)
    )
    return result[0]
  }

  neighborhood() {
    const result = store.neighborhoods.filter(
      function(neighborhood) {
        return neighborhood.id === this.neighborhoodId
      }.bind(this)
    )
    return result[0]
  }

  customer() {
    const result = store.customers.filter(
      function(customer) {
        return customer.id === this.customerId
      }.bind(this)
    )
    return result[0]
  }
}
