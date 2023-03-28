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
                url: "/home/:name",
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


        function homeController($http, $state, $window, $stateParams){
            var vm = this;
            vm.cart = [];
            vm.cartIsOpen = false;


            $http.get("http://localhost:3000/items")
                 .then(function(response){
                    vm.items = response.data;
                 })

            $http.get("http://localhost:3000/cart")
                 .then(function(response){
                    vm.cart = response.data;
                 })

                vm.searchItem = function(){
                   if(vm.name){
                       $state.go("productSearch", {name: vm.name})}
                   else{
                       $state.go("home")
                   }
                }

                vm.addToCart = function(product) {
                    if (!Array.isArray(vm.cart)) {
                        vm.cart = [];
                    }
                    var cartItemIndex = vm.cart.findIndex(function(item) {
                        console.log(item.product)
                        console.log(item);
                        return item.productID === product.id
                    });

                    // if (cartItemIndex === -1) {
                    //         var tempProduct = {
                    //             productID: product.id,
                    //             name: product.name,
                    //             price: product.price,
                    //             quantity: product.quantity,
                    //             imageURL: product.imageURL
                    //         }


                    //         console.log(vm.cart)
                    // } else {
                    //     vm.cart[cartItemIndex].quantity++;
                    // }
                    // var t
                    // $http.post('http://localhost:3000/cart', tempProduct)
                    //     .then(function(response){
                    //         //vm.cart.push(product);
                    //         t = response.data.id
                    //         console.log(vm.cart)

                    //     var temp = {
                    //         productID: product.id,
                    //             name: product.name,
                    //             price: product.price,
                    //             quantity: product.quantity,
                    //             imageURL: product.imageURL,
                    //             id: t
                    //     }
                    //     vm.cart.push(temp);
                    //     })

                        console.log("ovo treba poslednje")
                    if (cartItemIndex === -1) {
                        var tempProduct = {
                            productID: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            imageURL: product.imageURL
                        };
                        $http.post('http://localhost:3000/cart', tempProduct)
                            .then(function(response) {
                                tempProduct.id = response.data.id;
                                vm.cart.push(tempProduct);
                            });
                    } else {
                        vm.cart[cartItemIndex].quantity++;
                    }

                };

                vm.cartTotal = function() {
                    var totalPrice = 0;
                    angular.forEach(vm.cart, function(item) {
                        totalPrice += item.price * item.quantity;
                    });
                    console.log(totalPrice)
                    return totalPrice;
                };
                console.log(vm.cartTotal())

                vm.clearCart = function(){
                    vm.cart = [];
                    vm.cartTotal();
                    $http.post('http://localhost:3000/cart', vm.cart);
                }

                vm.removeItem = function(items) {
                    //const itemIndex = vm.cart.findIndex(cart => cart.id === itemId);
                    //$http.post('http://localhost:3000/cart', vm.cart);
                    // $http.delete('http://localhost:3000/cart/?id=' + itemId)
                    //     .then(function(response){
                    //         vm.cart.splice(itemIndex, 1);
                    //     }).catch(function(error) {
                    //         console.error(error);
                    //     });

                        // $http.delete('http://localhost:3000/cart/'+itemId)
                        //     .then(function(response){
                        //         //vm.cart = [];
                        //         console.log("Successfully deleted")
                        //     }).catch(function(error){
                        //         console.log(error)
                        //     })
                        

                            $http.delete('http://localhost:3000/cart/' + items.id)
                              .then(function(response) {
                                var index = vm.cart.findIndex(function(item) {
                                  return item.id === items.id;
                                });
                                // Remove the item from the array
                                vm.cart.splice(index, 1);
                                console.log("Successfully deleted item with id:", items);
                              })
                              .catch(function(error) {
                                console.log(error);
                                console.log(items.id)
                              });
                          
                }

                vm.updateCart = function() {
                    vm.cartTotal()
                };

                vm.completeOrder = function() {
                    console.log(vm.cart)
                     //vm.cart = [];
                    angular.forEach(vm.cart, function(item) {
                        console.log(item)
                        console.log(item.id)
                        $http.delete('http://localhost:3000/cart/'+item.id)
                            .then(function(response){
                                vm.cart = [];
                                console.log("Successfully deleted")
                            }).catch(function(error){
                                console.log(error)
                            })
                    });
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

        function productDetailsController($http, $stateParams, $window){
            var vm = this;
            vm.cart = [];

            $http({
                url: "http://localhost:3000/items",
                params:{id:$stateParams.id},
                method: "get"
            })

            .then(function(response){
                vm.item = response.data[0];
                console.log(response)
            })

            vm.addToCart = function(product) {
                var cartItemIndex = vm.cart.findIndex(function(item) {
                    return item.productID === product.id
                });

                if (cartItemIndex === -1) {
                        var tempProduct = {
                            productID: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            imageURL: product.imageURL
                        }
                        $http.post('http://localhost:3000/cart', tempProduct)
                            .then(function(response) {
                                tempProduct.id = response.data.id;
                                vm.cart.push(tempProduct);
                            });
                } else {
                    vm.cart[cartItemIndex].quantity++;
                }
                console.log(vm.cart)
                //$http.post('http://localhost:3000/cart', vm.cart);
            };
        };

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
            };
        };