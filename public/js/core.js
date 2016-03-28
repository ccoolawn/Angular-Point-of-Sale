var emerilsFood = angular.module('emerilsFood', ['ngRoute', 'foodController', 'foodService']);

emerilsFood.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/neworder.html'
	})
	.when('/addnew', {
		controller: 'mainController',
		templateUrl: '/partials/createfood.html'
	})

	.otherwise('/');
});