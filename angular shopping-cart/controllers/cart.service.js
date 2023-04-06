angular.module('Demo').factory('cartService', cartService);

function cartService($http) {
	var service = {
		getCartData: function () {
			return $http.get('http://localhost:3000/cart').then(function (response) {
				return response.data;
			});
		},
		updateCartItem: function (item) {
			return $http.put('http://localhost:3000/cart/' + item.id, item);
		},
		removeCartItem: function (item) {
			return $http.delete('http://localhost:3000/cart/' + item.id);
		},
		deleteCart: function (item) {
			return $http.delete('http://localhost:3000/cart/' + item).catch(function (error) {
				console.log(error);
			});
		},
		addToCart: function (product) {}
	};

	return service;
}
