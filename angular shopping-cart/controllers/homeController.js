angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['$http', '$state', '$timeout'];

function homeController($http, $state, $timeout) {
	var vm = this;
	vm.cart = [];
	vm.cartIsOpen = false;
	vm.isEmptyingBasket = false;

	$http.get('http://localhost:3000/items').then(function (response) {
		vm.items = response.data;
	});

	$http.get('http://localhost:3000/cart').then(function (response) {
		vm.cart = response.data;
	});

	vm.searchItem = function () {
		if (vm.name) {
			$state.go('productSearch', { name: vm.name });
		} else {
			$state.go('home');
		}
	};

	vm.addToCart = function (product) {
		if (!Array.isArray(vm.cart)) {
			vm.cart = [];
		}
		var cartItemIndex = vm.cart.findIndex(function (item) {
			console.log(item.product);
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
			console.log(vm.cart);
		} else {
			vm.cart[cartItemIndex].quantity++;
			$http.put('http://localhost:3000/cart/' + vm.cart[cartItemIndex].id, vm.cart[cartItemIndex]).then(function (response) {
				console.log(vm.cart[cartItemIndex].id);
			});
		}
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

	vm.cartTotalQuantity = function () {
		var totalQuantity = 0;
		angular.forEach(vm.cart, function (product) {
			totalQuantity += product.quantity;
		});
		return totalQuantity;
	};

	vm.completeOrder = function () {
		vm.isEmptyingBasket = true;
		for (let i = vm.cart.length - 1; i >= 0; i--) {
			$timeout(function () {
				$http
					.delete('http://localhost:3000/cart/' + vm.cart[i].id)
					.then(function (response) {})
					.catch(function (error) {
						console.log(error);
					});
			}, 500 * i);
		}
		$timeout(function () {
			vm.cart = [];
			vm.isEmptyingBasket = false;
		}, 500 * vm.cart.length + 500);
	};
}
