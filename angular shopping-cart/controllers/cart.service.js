angular.module('Demo').factory('cartService', cartService);

function cartService($http, $timeout) {
	var vm = this;
	vm.cart = [];
	isEmptyingBasket = false;
	var service = {
		getProducts: function () {
			return $http.get('http://localhost:3000/items').then(function (response) {
				return response.data;
			});
		},
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
		saveCartData: function (cart) {
			return $http.post('http://localhost:3000/cart', cart);
		},
		addToCart: function (product) {
			if (!Array.isArray(vm.cart)) {
				vm.cart = [];
			}
			var cartItemIndex = vm.cart.findIndex(function (item) {
				console.log(item);
				return item.productID === product.id;
			});
			if (cartItemIndex === -1) {
				var tempProduct = {
					productID: product.id,
					name: product.name,
					price: product.price,
					quantity: product.quantity,
					imageURL: product.imageURL
				};
				var t;
				service.saveCartData(tempProduct).then(function (response) {
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
		},
		completeOrder: function (cart) {
			service.isEmptyingBasket = true;
			for (let i = cart.length - 1; i >= 0; i--) {
				$timeout(function () {
					service.deleteCart(cart[i].id);
				}, 500 * i);
			}
			$timeout(function () {
				cart.length = [];
				service.isEmptyingBasket = false;
			}, 500 * cart.length + 500);
			$timeout(function () {
				alert('Succes');
			}, 500 * cart.length + 700);
		}
	};

	return service;
}
