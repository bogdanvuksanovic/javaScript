angular.module('Demo').controller('productDetailsController', productDetailsController);

productDetailsController.$inject = ['$http', '$stateParams', 'cartService'];

function productDetailsController(cartService) {
	var vm = this;
	vm.cart = [];
	vm.addToCart = addToCart;

	cartService.getProductDetails().then(function (response) {
		vm.item = response;
	});

	function addToCart(product) {
		cartService.addToCart(product, vm.cart);
	}
}
