angular.module('Demo').controller('itemsController', itemsController);

function itemsController($http) {
	var vm = this;
	$http.get('http://localhost:3000/cart').then(function (response) {
		vm.items = response.data;
	});
	console.log(vm.items);

	vm.updateCart = function () {
		vm.cartTotal();
	};
}
