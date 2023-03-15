angular
        .module("Demo", ["ui.router"])
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
                  url:"/cart",
                  templateUrl:"./templates/cart.html",
                  controller:"itemsController",
                  controllerAs:"vm"
              })
              $locationProvider.html5Mode(true);
        })
        .controller("homeController", homeController)
        .controller("itemsController", itemsController)
        function homeController($http){
            var vm = this;
            $http.get("http://localhost:3000/items")
                 .then(function(response){
                    vm.items = response.data;
                 })

                vm.cartItems = [];
                vm.addToCart = function(product) {
                    if (!Array.isArray(vm.cartItems)) {
                        vm.cartItems = [];
                    }
                    // Check if product is already in cart
                    var cartItemIndex = vm.cartItems.findIndex(function(item) {
                        return item.product.name === product.name;
                    });
             
                    if (cartItemIndex === -1) {
                        // Add new cart item
                        vm.cartItems.push({
                            product: product
                        });
                    } else {
                        // Increase quantity of existing cart item
                        vm.cartItems[cartItemIndex].product.quantity++;
                    }

                    console.log(vm.cartItems)
                };


                vm.cartTotal = function() {
                    var totalPrice = 0;
                    angular.forEach(vm.items, function(item) {
                        totalPrice += item.price * item.quantity;
                    });
                    console.log(totalPrice)
                    return totalPrice;
                };
                console.log(vm.cartTotal())

                vm.clearCart = function(){
                    vm.cartItems = 0;
                    //vm.cartTotal();
                }

                vm.removeItem = function(item) {
                    var index = vm.cart.indexOf(item);
                    vm.cart.splice(index, 1);
                  };
    
                vm.updateCart = function() {
                    vm.cartTotal()
                };
        }

        // .controller("itemsController", function($http, $state) {
        //     var vm = this;
        //     $http.get("http://localhost:3000/items")
        //         .then(function(response){
        //           vm.items = response.data;
        //         });
        //     vm.cartTotal = function() {
        //         var totalPrice = 0;
        //         angular.forEach(vm.items, function(item) {
        //             totalPrice += item.price * item.quantity;
        //         });
        //         return totalPrice;
        //     };

        //     vm.updateCart = function() {
        //         vm.cartTotal()
        //     };
        // })
        
        
        function itemsController($http){
            var vm = this;
            $http.get("http://localhost:3000/items")
                .then(function(response){
                  vm.items = response.data;
                });
            // vm.cartTotal = function() {
            //     var totalPrice = 0;
            //     angular.forEach(vm.items, function(item) {
            //         totalPrice += item.price * item.quantity;
            //     });
            //     return totalPrice;
            // };

            vm.updateCart = function() {
                vm.cartTotal()
            };
        }