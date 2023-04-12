angular.module('Demo').controller('productSearchController', productSearchController);

productSearchController.$inject = ['$http', '$stateParams', '$timeout', 'cartService'];

function productSearchController($http, $stateParams, $timeout, cartService) {
	var vm = this;

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	if ($stateParams.name) {
		$http({
			url: 'http://localhost:3000/items?name_like=' + $stateParams.name,
			method: 'get'
		}).then(function (response) {
			vm.items = response.data;
		});
	}

	// $http.get('http://localhost:3000/cart').then(function (response) {
	// 	vm.cart = response.data;
	// });

	vm.addToCart = function (product) {
		// var cartItemIndex = vm.cart.findIndex(function (item) {
		// 	return item.productID === product.id;
		// });

		// if (cartItemIndex === -1) {
		// 	var tempProduct = {
		// 		productID: product.id,
		// 		name: product.name,
		// 		price: product.price,
		// 		quantity: product.quantity,
		// 		imageURL: product.imageURL
		// 	};

		// 	var t;
		// 	$http.post('http://localhost:3000/cart', tempProduct).then(function (response) {
		// 		t = response.data.id;

		// 		t = {
		// 			productID: product.id,
		// 			name: product.name,
		// 			price: product.price,
		// 			quantity: product.quantity,
		// 			imageURL: product.imageURL,
		// 			id: t
		// 		};
		// 		vm.cart.push(t);
		// 		console.log(vm.cart);
		// 	});
		// } else {
		// 	vm.cart[cartItemIndex].quantity++;
		// 	$http.put('http://localhost:3000/cart/' + vm.cart[cartItemIndex].id, vm.cart[cartItemIndex]).then(function (response) {});
		// }
		// console.log(vm.cart);
		cartService.addToCart(product);
		cartService.getCartData().then(function (response) {
			vm.cart = response;
		});
	};
	vm.cartTotal = function () {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (item) {
			totalPrice += item.price * item.quantity;
		});
		return totalPrice;
	};
	console.log(vm.cartTotal());

	vm.clearCart = function () {
		vm.cart = [];
		vm.cartTotal();
		$http.post('http://localhost:3000/cart', vm.cart);
	};

	vm.removeItem = function (items) {
		$http
			.delete('http://localhost:3000/cart/' + items.id)
			.then(function (response) {
				var index = vm.cart.findIndex(function (item) {
					return item.id === items.id;
				});
				vm.cart.splice(index, 1);
				console.log('Successfully deleted item with id:', items);
			})
			.catch(function (error) {
				console.log(error);
				console.log(items.id);
			});
	};

	// vm.updateCart = function () {
	// 	$http.put('http://localhost:3000/cart/' + vm.cart[cartItemIndex].id, vm.cart[cartItemIndex]).then(function (response) {
	// 		console.log(vm.cart[cartItemIndex].id);
	// 	});
	// };

	vm.completeOrder = function () {
		//vm.cart = [];
		// console.log(item);
		// console.log(item.id);
		// for (let i = vm.cart.length - 1; i >= 0; i--) {
		// 	$timeout(function () {
		// 		$http
		// 			.delete('http://localhost:3000/cart/' + vm.cart[i].id)
		// 			.then(function (response) {})
		// 			.catch(function (error) {
		// 				console.log(error);
		// 			});
		// 	}, 500 * i);
		// }
		// $timeout(function () {
		// 	vm.cart = [];
		// }, 500 * vm.cart.length + 500);
		// alert('Your order is succesfuly completed!');
		cartService.completeOrder(vm.cart);
	};
}
