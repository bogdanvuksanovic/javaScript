angular.module('Demo').controller('productSearchController', productSearchController);

productSearchController.$inject = ['$http', '$stateParams', 'cartService'];

function productSearchController($http, $stateParams, cartService) {
	var vm = this;
	vm.addToCart = addToCart;
	vm.cartTotal = cartTotal;
	vm.clearCart = clearCart;
	vm.removeItem = removeItem;
	vm.completeOrder = completeOrder;

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

	function addToCart(product) {
		cartService.addToCart(product, vm.cart);
	}
	function cartTotal() {
		var totalPrice = 0;
		angular.forEach(vm.cart, function (item) {
			totalPrice += item.price * item.quantity;
		});
		return totalPrice;
	}
	console.log(vm.cartTotal());

	function clearCart() {
		vm.cart = [];
		vm.cartTotal();
		$http.post('http://localhost:3000/cart', vm.cart);
	}

	function removeItem(items) {
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
	}

	function completeOrder() {
		cartService.completeOrder(vm.cart);
	}
}
