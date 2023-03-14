angular.module("Demo", ["ui.router"])
       .config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider){
            $urlRouterProvider.otherwise("/home")
            $stateProvider
              .state("home", {
                 url:"/home",
                 templateUrl:"./templates/home.html",
                 controller:"homeController",
                 controllerAs:"vm"
              })
              .state("items", {
                  url:"/shoppingCart",
                  templateUrl:"./templates/items.html",
                  controller:"itemsController",
                  controllerAs:"vm"
              })
              $locationProvider.html5Mode(true);
       })

        .controller("itemsController", function($http, $state) {
            var vm = this;
            $http.get("http://localhost:3000/items")
                .then(function(response){
                  vm.items = response.data;
                });
            vm.cartTotal = function() {
                var totalPrice = 0;
                angular.forEach(vm.items, function(item) {
                    totalPrice += item.price * item.quantity;
                });
                return totalPrice;
            };

            vm.updateCart = function() {
                vm.cartTotal()
            };

            })