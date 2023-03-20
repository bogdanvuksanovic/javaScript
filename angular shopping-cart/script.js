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
              .state("productSearch", {
                url: "/productSearch/",
                templateUrl: "./templates/productSearch.html",
                controller: "productSearchController",
                controllerAs: "vm"
              })
              .state("productDetails", {
                url: "/productDetails/:id",
                templateUrl: "./templates/productDetails.html",
                controller: "productDetailsController",
                controllerAs: "vm"
              })
              $locationProvider.html5Mode(true);
        })
        .controller("homeController", homeController)
        .controller("itemsController", itemsController)
        .controller("productDetailsController", productDetailsController)
        //.controller("productSearch", productSearchController)
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
                        //return item.product.name === product.name;
                        console.log(item.product)
                        console.log(item);
                        //console.log(product)
                        return item.productID === product.id
                    });

            
             
                    if (cartItemIndex === -1) {
                        // Add new cart item
                        if (product.id !== undefined && product.id !== null) { 
                        var tempProduct = {
                            productID: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            stock: product.stock,
                            imageURL: product.imageURL
                          }
                          
                        vm.cartItems.push(
                            tempProduct
                        );
                        console.log(vm.cartItems)
                        
                                $http.post('http://localhost:3000/cart', vm.cartItems)
                                //vm.cartItems = [];
                        } else {
                            console.log('Error: product id is undefined or null');
                            // handle the error here
                        }
                    } else {
                        // Increase quantity of existing cart item
                        vm.cartItems[cartItemIndex].quantity++;
                    }
                    //console.log(vm.c)
                    //console.log(vm.cartItems)
                };
                
                // this.buyOrder = function() {
                //     var orderProducts = [];
                //     // Create array of products with relevant details for order
                //     angular.forEach(vm.cart, function(product) {
                //       orderProducts.push({
                //         id: product.id,
                //         name: product.name,
                //         price: product.price,
                //         quantity: product.quantity
                //       });
                //     });
                //     // Add total to order object
                //     var order = {
                //       products: orderProducts,
                //       total: vm.cartTotal()
                //     };
                //     $http.post('http://localhost:3000/orders', order)
                //       .then(function(response){
                //         alert('Order successful!');
                //       });
                //     // Clear cart after order is placed
                //     this.cart = [];
                //   };
            
            


                vm.cartTotal = function() {
                    var totalPrice = 0;
                    angular.forEach(vm.cartItems, function(item) {
                        totalPrice += item.price * item.quantity;
                    });
                    console.log(totalPrice)
                    return totalPrice;
                };
                console.log(vm.cartTotal())

                vm.clearCart = function(){
                    vm.cartItems = 0;
                    vm.cartTotal();
                }

                vm.removeItem = function(itemId) {
                    const itemIndex = vm.cartItems.findIndex(item => item.id === itemId);
                        vm.cartItems.splice(itemIndex, 1);
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
            $http.get("http://localhost:3000/cart")
                .then(function(response){
                  vm.items = response.data;
                });
                console.log(vm.items)
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

        //function productSearchController()

        function productDetailsController($http, $stateParams){
            var vm = this;
            $http({
                url: "http://localhost:3000/items",
                params:{id:$stateParams.id},
                method: "get"
            })
            .then(function(response){
                vm.item = response.data[0];
                console.log(response)
            })
        }