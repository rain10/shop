/**
 * Created by Administrator on 2017/8/17 0017.
 */
angular.module('controller',[])
    .controller('navController',function ($scope) {
    $scope.navs = [
        {link: '#/pro',id:1, text: '首页', icon: 'mui-icon mui-icon-home'},
        {link: '#/cart',id:2, text: '购物车', icon: 'mui-icon mui-icon-extra mui-icon-extra-cart'},
        {link: '#/order',id:3, text: '订单', icon: 'mui-icon mui-icon-bars'},
        {link: '#/person',id:4, text: '个人中心', icon: 'mui-icon mui-icon-person'},
        ];
})
    .controller('proController',function ($scope,$rootScope,$http) {
        $scope.goods = [];
        $http.get("data.json").success(function (data) {
          $scope.goods = data.goods;
            var k = 0;
            for (var i = 0;i<$scope.goods.length;i++){
                for (var j = 0;j<$scope.goods[i].foods.length;j++){
                    $scope.goods[i].foods[j].id = k++;
                    $scope.goods[i].foods[j].count = 0;
                }
            }
            console.log($scope.goods)
          $scope.foods = $scope.goods[0].foods;
          $scope.goodsName = $scope.goods[0].name;
        });

        $scope.activeTab = 0;
        $scope.showNav = function (data,indexTab) {
            $scope.foods = data.foods;
            $scope.goodsName = data.name;
            $scope.activeTab = indexTab;
        }


        $("#search").blur(function () {
            var text = $("#search").val();
            var i = 0;
            for ( i ;i<$scope.goods.length;i++){
                console.log(text);
                for (var j = 0;j<$scope.goods[i].foods.length;j++){
                    if ($scope.goods[i].foods[j].name.indexOf(text)!=-1) {
                        $scope.foods = $scope.goods[i].foods;
                        $scope.goodsName =$scope.goods[i].name;
                        console.log($scope.goods[i].foods);
                        console.log($scope.goods[i].name);
                        return;
                    }
                }
            }
            showNav($scope.goods[i],i);
        })

        $("#nav").height($(window).height()-94);
        $("#proContent").height($(window).height()-94);
        $scope.pros = '#/productDetail';
        $scope.num;
        $scope.change = function (num,count) {
            console.log(count)
        if(count.count==0 && num<0) {
            return;
        }
        count.count = count.count + num;

        $rootScope.countNum+=num;
        if($rootScope.item.length>0) {
            for(var i=0;i<$rootScope.item.length;i++) {
                if($rootScope.item[i].id==count.id) {
                    $rootScope.item[i].count+num
                    return;
                }
            }
            $rootScope.item.push(count);
        } else {
            $rootScope.item.push(count);
        }
    }
})
    .controller('cartController',function ($scope,$rootScope) {
        $scope.listItem = angular.copy($rootScope.item);
        $scope.priceCount = 0
        if ($scope.listItem.length>0){
        for(var i = 0;i<$scope.listItem.length;i++){
            $scope.priceCount+=$scope.listItem[i].count*$scope.listItem[i].price;
        }
    }
    $scope.flag = false;
    $("#show").on('click',function () {
        $scope.flag = !$scope.flag;
    })
    $scope.rediret = function (count,item) {
        console.log(item)
        location.href = './apply/pay.html?'+count;
    }    
})
    .controller('payController',function ($scope,$location,$rootScope) {
    $rootScope.navIndex = 2;
    $scope.applyCount = 0;
    var jsonList = angular.toJson($location.search().count,true)
    console.log(jsonList)
    var searchStr = location.search;
    console.log(searchStr)
    $scope.applyCount = searchStr.split('?')[1];
    $scope.rediertToOrder = function (list) {
        $rootScope.orderFlag = true;
        console.log(list)
        location.href = '../index.html#/order?flag='+$rootScope.orderFlag+'&list='+$rootScope.item;
    }
})
    .controller('orderController',function ($scope,$location,$rootScope) {
    $rootScope.navIndex = 3;
    $scope.orderState = $location.search();
    console.log($scope.orderState)
    if ($scope.orderState.flag === 'false') {
        $scope.state = '待付款'
    }else {
        $scope.state = '已付款'
    }
})
    .controller('productDetailController',function ($location,$scope) {
    var name = $location.search();
    console.log(name)
})

