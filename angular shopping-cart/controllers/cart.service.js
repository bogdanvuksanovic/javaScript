angular.module('Demo').factory('cartService', cartService);

function cartService($http) {
	var vm = this;
	vm.cartData = [];
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
		addToCart: function (product) {
			if (!Array.isArray(vm.cart)) {
				vm.cart = [];
			}
			var cartItemIndex = vm.cart.findIndex(function (item) {
				console.log(item);
				return item.productID === product.id;
			});
			console.log('ovo treba poslednje');
			if (cartItemIndex === -1) {
				var tempProduct = {
					productID: product.id,
					name: product.name,
					price: product.price,
					quantity: product.quantity,
					imageURL: product.imageURL
				};
				var t;
				$http.post('http://localhost:3000/cart', tempProduct).then(function (response) {
					t = response.data.id;

					t = {
						productID: product.id,
						name: product.name,
						price: product.price,
						quantity: product.quantity,
						imageURL: product.imageURL,
						id: t
					};
					vm.cart.push(t);
					console.log(vm.cart);
				});
			} else {
				vm.cart[cartItemIndex].quantity++;
				service.updateCartItem(vm.cart[cartItemIndex]);
			}
			console.log(vm.cart);
		}
	};

	return service;
}
