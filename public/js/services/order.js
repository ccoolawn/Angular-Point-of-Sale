angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Order', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/total');
			},
			create : function(orderData) {
				return $http.post('/api/total', orderData);
			},
			show : function(id) {
				return $http.show('/api/total/' + id);
			},
			delete : function(id) {
				return $http.delete('/api/total/' + id);
			}
		};
	}]);