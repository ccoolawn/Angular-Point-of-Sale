angular.module('ordersController', [])

	// inject the Order service factory into our controller
	.controller('ordersController', ['$scope','$http','Order', function($scope, $http, Order) {
		$scope.formData = {};
		$scope.loading = true;

	$scope.quantity = 0;

	$scope.calculate = function() {
		$scope.subtotal = ($scope.price * $scope.quantity).toFixed(2);
	};

	// CREATE TOTAL==================================================================
	$scope.submitTotal = function() {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.text != undefined) {
			$scope.loading = true;

			// call the create function from our service (returns a promise object)
			Order.create($scope.formData)

				// if successful creation, call our get function to get all the new orders
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.orders = data; // assign our new list of orders
				});
		}
	};
}]);