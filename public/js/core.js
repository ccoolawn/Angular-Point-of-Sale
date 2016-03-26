var emerilsFood = angular.module('emerilsFood', ['ngRoute', 'foodController', 'foodService', 'orderService']);

emerilsFood.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/neworder.html'
	})
	.when('/addnew', {
		controller: 'mainController',
		templateUrl: '/partials/createfood.html'
	})
	.when('/complete', {
		controller: 'ordersController',
		templateUrl: '/partials/orderview.html'
	})

	.otherwise('/');
});