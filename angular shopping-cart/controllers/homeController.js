angular.module('Demo').controller('homeController', homeController);

homeController.$inject = ['$http', '$state', '$timeout', 'cartService'];

function homeController($http, $state, $timeout, cartService) {
	var vm = this;
	vm.cart = [];
	vm.cartIsOpen = false;
	vm.isEmptyingBasket = false;

	$http.get('http://localhost:3000/items').then(function (response) {
		vm.items = response.data;
	});

	// $http.get('http://localhost:3000/cart').then(function (response) {
	// 	vm.cart = response.data;
	// });

	cartService.getCartData().then(function (response) {
		vm.cart = response;
	});

	vm.searchItem = function () {
		if (vm.name) {
			$state.go('productSearch', { name: vm.name });
		} else {
			$state.go('home');
		}
	};

	vm.addToCart = function (product) {
		cartService.addToCart(product);
		console.log(vm.cart);
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

	vm.removeItem = function (product) {
		$http;
		cartService
			.removeCartItem(product)
			.then(function (response) {
				var index = vm.cart.findIndex(function (item) {
					return item.id === product.id;
				});
				vm.cart.splice(index, 1);
				console.log('Successfully deleted item with id:', product);
			})
			.catch(function (error) {
				console.log(error);
				console.log(product.id);
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
				cartService.deleteCart(vm.cart[i].id);
			}, 500 * i);
		}
		$timeout(function () {
			vm.cart = [];
			vm.isEmptyingBasket = false;
		}, 500 * vm.cart.length + 500);
		$timeout(function () {
			alert('Succes');
		}, 500 * vm.cart.length + 700);
	};
}
