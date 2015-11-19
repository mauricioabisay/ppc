var app = angular.module('ppc', ['ngRoute', 'ppcControllers', 'ppcFilters', 'ppcApi']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './partials/main.html',
    controller: 'PropuestaHomeCtrl'
  })
  .when('/create-titulo', {
    templateUrl: './partials/create-titulo.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/create-alcance', {
    templateUrl: './partials/create-alcance.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/create-categorias', {
    templateUrl: './partials/create-categorias.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/create-impacto', {
    templateUrl: './partials/create-impacto.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/create-beneficios', {
    templateUrl: './partials/create-beneficios.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/create-ubicacion', {
    templateUrl: './partials/create-ubicacion.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/detail/:id', {
    templateUrl: './partials/detail.html',
    controller: 'PropuestaDetailCtrl',
    controllerAs: 'ctrl'
  })
  .when('/list', {
    templateUrl: './partials/list.html',
    controller: 'PropuestaListCtrl',
    controllerAs: 'ctrl'
  })
  .when('/list-categoria/:filter', {
    templateUrl: './partials/list.html',
    controller: 'PropuestaListCtrl',
    controllerAs: 'ctrl'
  })
  .when('/list/:atendida', {
    templateUrl: './partials/list.html',
    controller: 'PropuestaListCtrl',
    controllerAs: 'ctrl'
  })
  .when('/categorias',{
    templateUrl: './partials/categorias/panel.html',
    controller: 'CategoriasCtrl',
    contrllerAs: 'ctrl'
  })
  .when('/tips',{
    templateUrl: './partials/tips/panel.html',
    controller: 'TipsCtrl',
    contrllerAs: 'ctrl'
  })
  .when('/login', {
    templateUrl: './partials/usuarios/registro.html',
    controller: 'UserCtrl',
    controllerAs: 'ctrl'
  })
}]);

app.run(function ($rootScope, $location, propuestas) {
  $rootScope.usuario = null;
  $rootScope.salir = function () {
    $rootScope.usuario = null;
    $location.path('/');
  };
  $rootScope.apoyar = function (item) {
    if($rootScope.usuario == null) {
      $location.path('/login');
    } else {
      item.votos = item.votos + 1;
      propuestas.update(item);
    }
  };
});

app.controller('ApoyarCtrl', function ($rootScope, $scope, $location, propuestas) {
  this.apoyar = function (item) {
    if($rootScope.usuario == null) {
      $location.path('/login');
    } else {
      item.votos = item.votos + 1;
      propuestas.update(item);
    }
  };
});

app.directive('ppcNav', function () {
  return {
    restrict: 'E',
    templateUrl: './partials/menu.html'
  };
});

app.directive('ppcTop', function () {
  return {
    restrict: 'E',
    templateUrl: './partials/top-item.html',
    scope: {
      item: '='
    }
  };
})
app.directive('ppcList', function () {
  return {
    restrict: 'E',
    templateUrl: './partials/list-item.html'
  };
});
