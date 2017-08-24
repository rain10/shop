/**
 * Created by Administrator on 2017/8/17 0017.
 */
var app = angular.module('app',['ngRoute','controller']);
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/pro', {
        templateUrl: './pro.html',
        controller: 'proController'
    })
        .when('/cart', {
            templateUrl: './cart.html',
            controller: 'cartController'
        })
        .when('/order',{
            templateUrl:'./order.html',
            controller: 'orderController'
        })
        .when('/person',{
            templateUrl:'./person.html'
        })
        .when('/productDetail',{
            templateUrl:'./productDetail.html'
        })
        .otherwise({
            redirectTo: '/pro'
        });

}]);
app.run(['$rootScope',function($rootScope){
    $rootScope.orderFlag = false;
    var arrayObj = new Array();
    $rootScope.item = arrayObj;
    $rootScope.countNum = 0;
}]);
app.factory('paramService',function(){
    return {
        result:[],
        getResult:function(){
            return this.result;
        },
        setResult:function(res){
            this.result = res;
        }
    };
})


