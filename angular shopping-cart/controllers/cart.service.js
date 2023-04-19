angular.module('Demo').factory('cartService', cartService);

function cartService($http, $timeout, $stateParams) {
	var service = {
		getProducts: getProducts,
		getCartData: getCartData,
		updateCartItem: updateCartItem,
		removeCartItem: removeCartItem,
		deleteCart: deleteCart,
		saveCartData: saveCartData,
		getProductDetails: getProductDetails,
		addToCart: addToCart,
		clearCart: clearCart,
		completeOrder: completeOrder,
		completeOrder: completeOrder,
		removeItem: removeItem
	};

	return service;

	function getProducts() {
		return $http.get('http://localhost:3000/items').then(function (response) {
			return response.data;
		});
	}

	function getCartData() {
		return $http.get('http://localhost:3000/cart').then(function (response) {
			return response.data;
		});
	}

	function updateCartItem(item) {
		return $http.put('http://localhost:3000/cart/' + item.id, item);
	}

	function removeCartItem(item) {
		return $http.delete('http://localhost:3000/cart/' + item.id);
	}

	function deleteCart(item) {
		return $http.delete('http://localhost:3000/cart/' + item).catch(function (error) {
			console.log(error);
		});
	}

	function saveCartData(cart) {
		return $http.post('http://localhost:3000/cart', cart);
	}

	function getProductDetails() {
		return $http({
			url: 'http://localhost:3000/items',
			params: { id: $stateParams.id },
			method: 'get'
		}).then(function (response) {
			return response.data[0];
		});
	}

	function addToCart(product, cart) {
		if (!Array.isArray(cart)) {
			cart = [];
		}
		var cartItemIndex = cart.findIndex(function (item) {
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
				cart.push(t);
				console.log(cart);
			});
		} else {
			cart[cartItemIndex].quantity++;
			service.updateCartItem(cart[cartItemIndex]);
		}
		console.log(cart);
	}

	function clearCart(cart) {
		for (let i = cart.length - 1; i >= 0; i--) {
			$timeout(function () {
				service.deleteCart(cart[i].id);
			}, 500 * i);
		}
		$timeout(function () {
			cart.length = [];
		}, 500 * cart.length + 500);
		$timeout(function () {
			alert('Your order is deleted');
		}, 500 * cart.length + 700);
	}

	function completeOrder(cart, boolean) {
		boolean = true;
		for (let i = cart.length - 1; i >= 0; i--) {
			$timeout(function () {
				service.deleteCart(cart[i].id);
			}, 500 * i);
		}
		$timeout(function () {
			cart.length = [];
			boolean = false;
		}, 500 * cart.length + 500);
		$timeout(function () {
			alert('Succes');
		}, 500 * cart.length + 700);
	}

	function removeItem(product, cart) {
		$http;
		service
			.removeCartItem(product)
			.then(function (response) {
				var index = cart.findIndex(function (item) {
					return item.id === product.id;
				});
				cart.splice(index, 1);
				console.log('Successfully deleted item with id:', product);
			})
			.catch(function (error) {
				console.log(error);
				console.log(product.id);
			});
	}
}
