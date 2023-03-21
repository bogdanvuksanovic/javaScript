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
                url: "/productSearch/:name",
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
        .controller("productSearchController", productSearchController)

        function homeController($http, $state){
            var vm = this;
            vm.cartItems = [];
            vm.cartIsOpen = false;
            

            $http.get("http://localhost:3000/items")
                 .then(function(response){
                    vm.items = response.data;
                 })
                    
                 vm.searchItem = function(){
                    if(vm.name){
                        $state.go("productSearch", {name: vm.name})}
                    else{
                        $state.go("home")
                    }
                }

                vm.addToCart = function(product) {
                    if (!Array.isArray(vm.cartItems)) {
                        vm.cartItems = [];
                    }
                    var cartItemIndex = vm.cartItems.findIndex(function(item) {
                        console.log(item.product)
                        console.log(item);
                        return item.productID === product.id
                    });

            
             
                    if (cartItemIndex === -1) {
                            var tempProduct = {
                                productID: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: product.quantity,
                                stock: product.stock,
                                imageURL: product.imageURL
                          }
                          
                            vm.cartItems.push(tempProduct);
                            console.log(vm.cartItems)
                    } else {
                        vm.cartItems[cartItemIndex].quantity++;
                    }
                };

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

                vm.completeOrder = function() {
                    if (!Array.isArray(vm.cartItems)) {
                        vm.cartItems = [];
                    }
                    vm.tempProduct = [];
                        angular.forEach(vm.cartItems, function(product){
                        tempProduct = {
                            productID: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            stock: product.stock,
                            imageURL: product.imageURL
                        }
                    })
                        vm.cartItems.push(tempProduct);
                        console.log(vm.cartItems)
                        $http.post('http://localhost:3000/cart', vm.cartItems);
                        vm.cartItems = [];
                }
        }
               
        function itemsController($http){
            var vm = this;
            $http.get("http://localhost:3000/cart")
                .then(function(response){
                  vm.items = response.data;
                });
                console.log(vm.items)

            vm.updateCart = function() {
                vm.cartTotal()
            };
        }

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

        function productSearchController($http, $stateParams){
            var vm = this;

            if($stateParams.name){
                $http({
                    url:"http://localhost:3000/items?name_like=" + $stateParams.name,
                    method:"get"
                })
                .then(function(response){
                    vm.items = response.data
                })
            }
        }