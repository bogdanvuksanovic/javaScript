angular.module("shoppingCart", [])
        .controller("cartCtrl", function($http) {
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

              };

            })