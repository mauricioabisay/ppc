var api = angular.module('ppcApi', []);

api.factory('propuestas', ['$http', function ($http) {
  var urlBase = '/propuestas/';
  var dataFactory = {};

  dataFactory.getAll = function () {
    return $http.get(urlBase);
  };

  dataFactory.get = function (id) {
    return $http.get(urlBase + id);
  };

  dataFactory.searchByTitle = function (text) {
    return $http.get(urlBase + 'searchByTitle/' + text);
  };

  dataFactory.getTopList = function (alcance) {
    return $http.get(urlBase + 'searchTopTen/' + alcance);
  }

  dataFactory.getFilter = function (filter) {
    return $http.post(urlBase + 'searchFilter', filter);
  }

  dataFactory.save = function (data) {
    return $http.post(urlBase, data);
  };

  dataFactory.update = function (item) {
    return $http.put(urlBase + item._id, item);
  }

  dataFactory.getAllCategorias = function () {
    return $http.get('/categorias/');
  };

  dataFactory.searchTop = function (query) {
    return $http.post(urlBase + 'searchTop/', query);
  };

  dataFactory.getTip = function () {
    return $http.get('/tips/random');
  };

  return dataFactory;
}]);

api.factory('categorias', ['$http', function ($http) {
  var urlBase = '/categorias';
  var dataFactory = {};

  dataFactory.getAll = function () {
    return $http.get(urlBase);
  };

  dataFactory.save = function (data) {
    return $http.post(urlBase, data);
  };

  dataFactory.remove = function (id) {
    return $http.delete(urlBase + "/" + id);
  };
  return dataFactory;
}]);

api.factory('tips', ['$http', function ($http) {
  var urlBase = '/tips/';
  var dataFactory = {};

  dataFactory.getAll = function () {
    return $http.get(urlBase);
  };

  dataFactory.save = function (data) {
    return $http.post(urlBase, data);
  };

  dataFactory.remove = function (id) {
    return $http.delete(urlBase + id);
  };
  return dataFactory;
}]);

api.factory('usuarios', ['$http', function ($http) {
  var urlBase = '/usuarios/';
  var dataFactory = {};

  dataFactory.get = function (usuario) {
    return $http.post(urlBase + 'auth', usuario);
  };
  dataFactory.save = function (usuario) {
    return $http.post(urlBase, usuario);
  };
  return dataFactory;
}]);
