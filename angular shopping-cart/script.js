var app = angular.module("shoppingCart", [])
                 .controller("cartCtrl", function($scope, $http) {
  $http.get("http://localhost:3000/items")
      .then(function(response){
        $scope.items = response.data;
      });
      $scope.cartTotal = function() {
        var totalPrice = 0;
        angular.forEach($scope.items, function(item) {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    };
    
    $scope.updateCart = function() {
      // Recalculate cart total
    };
      
  })

  // $scope.updateCart = function() {
  //   // Recalculate cart total
  // };
  // $scope.cartTotal = function() {
  //   var total = 0;
  //   // angular.forEach($scope.items , function(total) {
  //   //   total += $scope.items[0].quantity * $scope.items[0].price;
  //   // });
  //   for (var i = 0; i < items.lenght; i++) {
  //     total += $scope.items[i].quantity * $scope.items[i].price;
  //   }
  //   return total;
  // };

