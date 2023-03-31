angular.module('Demo').controller('productSearchController', productSearchController);

function productSearchController($http, $stateParams) {
	var vm = this;

	if ($stateParams.name) {
		$http({
			url: 'http://localhost:3000/items?name_like=' + $stateParams.name,
			method: 'get'
		}).then(function (response) {
			vm.items = response.data;
		});
	}
}
