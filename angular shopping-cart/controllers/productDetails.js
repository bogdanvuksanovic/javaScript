angular.module('Demo').controller('productDetailsController', productDetailsController);

productDetailsController.$inject = ['$http', '$stateParams'];

function productDetailsController($http, $stateParams) {
	var vm = this;
	vm.cart = [];

	$http({
		url: 'http://localhost:3000/items',
		params: { id: $stateParams.id },
		method: 'get'
	}).then(function (response) {
		vm.item = response.data[0];
		console.log(response);
	});

	vm.addToCart = function (product) {
		var cartItemIndex = vm.cart.findIndex(function (item) {
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
			$http.put('http://localhost:3000/cart/' + vm.cart[cartItemIndex].id, vm.cart[cartItemIndex]).then(function (response) {});
		}
		console.log(vm.cart);
		alert('Product is added!');
	};
}
