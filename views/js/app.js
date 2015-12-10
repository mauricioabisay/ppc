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
  .when('/create-contexto', {
    templateUrl: './partials/create-contexto.html',
    controller: 'PropuestaCreateCtrl',
    controllerAs: 'ctrl'
  })
  .when('/detail/:id', {
    templateUrl: './partials/detail.html',
    controller: 'PropuestaDetailCtrl',
    controllerAs: 'ctrl'
  })
  .when('/update/:id', {
    templateUrl: './partials/propuestas/edit.html',
    controller: 'PropuestaEditCtrl',
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
  .when('/users', {
    templateUrl: './partials/usuarios/list.html',
    controller: 'UsersCtrl',
    controllerAs: 'ctrl'
  })
  .when('/login', {
    templateUrl: './partials/usuarios/registro.html',
    controller: 'UserCtrl',
    controllerAs: 'ctrl'
  })
  .when('/profile', {
    templateUrl: './partials/usuarios/perfil.html',
    controller: 'UserCtrl',
    controllerAs: 'ctrl'
  })
}]);

app.run(function ($rootScope, $location, propuestas) {
  $rootScope.usuario = null;
  /*Funcion que permite al usuario Salir de su cuenta*/
  $rootScope.salir = function () {
    $rootScope.usuario = null;
    $location.path('/');
  };
  /*Funcion que permite al usuario Apoyar una propuesta*/
  $rootScope.apoyar = function (item) {
    if($rootScope.usuario == null) {
      $location.path('/login');
    } else {
      item.usuario = $rootScope.usuario._id;
      propuestas.apoyar(item)
      .success(function (data) {
      })
      .error(function () {
      });
    }
  };
  /*Funcion que permite al usuario editar su propuesta*/
  $rootScope.editar = function (item) {
    $location.path( '/update/' + item._id );
  };
  /*Funcion que permite al usuario ver el detalle de una propuesta*/
  $rootScope.detalle = function (item) {
    $location.path('/detail/' + item._id);
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
});
app.directive('ppcList', function () {
  return {
    restrict: 'E',
    templateUrl: './partials/list-item.html'
  };
});
