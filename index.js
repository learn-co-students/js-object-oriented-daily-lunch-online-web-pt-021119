let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;


class Neighborhood {
    constructor(name) {
        this.name = name; 
        this.id = ++neighborhoodId;

        store.neighborhoods.push(this)
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id }.bind(this));

    }

    customers() {
        return store.customers.filter(
            function(customer) { 
                return customer.neighboordId === this.id}.bind(this));
    }

    meals() { 
        return deliveries.map(function(delivery){return delivery.mealId}):
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.name = name 
        this.neighborhoodId = neighborhoodId
        this.id = ++customerId

        store.customers.push(this)
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id}.bind(this))
        };

    meals() {
        return deliveries.map(
            function(delivery){return delivery.mealId));
        }

    totalSpent() {
            let price = store.meals.map(function(meal){return meal.prices});
            let amount = (ele1, ele2) => ele1 + ele2;
            let total = price.reduce(amount)
            return total;
        }
    }

class Meal {
    constructor(title, price){
        this.title = title
        this.price = price
        this.id = ++meal.id 

        store.meals.push(this)
    }

    deliveries() {
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id}.bind(this))
    };

    customers() {
        return deliveries.map(
            function(delivery){return delivery.customerId));
    }

    static byPrice(){
        const byPriceArr = [...store.meals].sort((a, b) => b.price - a.price );
        return byPriceArr;
      }

}

class Delivery {
        constructor(mealId, neighboorhoodId, customerId){
            this.mealId = meal.id;
            this.neighboorhoodId = neighborhood.id;
            this.customerId = customerId
            this.id = ++tripId;
          
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
            }.bind(this)
            );
        }

        neighborhood(){
            return store.neighborhoods.find(
                function(neighborhood){
                    return neighborhood.id === this.neighborhoodId;
                }.bind(this)
            )}
    }



    