var ctrls = angular.module('ppcControllers', ['ngResource','ngRoute','ngCookies','ppcApi']);
var aux_propuesta = {};

var aux_categorias = [
  {titulo:'Agricultura'},{titulo:'Reformas políticas'},{titulo:'Derechos civiles'},
  {titulo:'Políticas públicas'},{titulo:'Protección al consumidor'},{titulo:'Políticas laborales'},
  {titulo:'Justicia criminal y fuerza pública'},{titulo:'Derechos humanos'},{titulo:'Economía'},
  {titulo:'Seguridad Social'},{titulo:'Educación'},{titulo:'Innovación tecnológica y medios de comunicación'},
  {titulo:'Energía'},{titulo:'Transportes'},{titulo:'Medio ambiente'},{titulo:'Caminos y vías de comunicación'},
  {titulo:'Familia'},{titulo:'Espacios públicos'},{titulo:'Salud'},{titulo:'Asuntos electorales'},
  {titulo:'Constitución Política'},{titulo:'Leyes Estatales'},{titulo:'Leyes Municipales'},{titulo:'Reglamentos'}
];

/**
Controlador para crear una nueva PROPUESTA
*/
ctrls.controller('PropuestaCreateCtrl',
['$scope', '$rootScope', '$location', 'propuestas',
function ($scope, $rootScope, $location, propuestas) {
  if(!$rootScope.usuario) {
    $location.path('/login');
    return;
  }
  $scope.currentMenu = 'new';
  $scope.sugerencias = [];
  propuestas.getAllCategorias()
  .success(function (data) {
    $scope.categorias = data;
  })
  .error(function (err) {
    $scope.categorias = aux_categorias;
  });
  $scope.propuesta_nueva = aux_propuesta;

  if( !($scope.propuesta_nueva.titulo === "") ) {
    propuestas.searchByTitle($scope.propuesta_nueva.titulo)
    .success(function (data) {
      $scope.sugerencias = data;
    })
    .error(function (err) {
      $scope.sugerencias = [];
    });
  } else {
    $scope.sugerencias = [];
  }

  propuestas.getTip()
  .success(function (data) {
    $scope.tip = data;
  })
  .error(function () {
    $scope.tip = {};
  });

  this.buscar = function () {
    if( !($scope.propuesta_nueva.titulo === "") ) {
      propuestas.searchByTitle($scope.propuesta_nueva.titulo)
      .success(function (data) {
        $scope.sugerencias = data;
      })
      .error(function (err) {
        $scope.sugerencias = [];
      });
    } else {
      $scope.sugerencias = [];
    }
  };
  this.alcance = function () {
    $location.path( '/create-alcance' );
  };
  this.categorias = function () {
    $location.path( '/create-categorias' );
    $scope.propuesta_nueva.categorias = new Array();
  };
  this.agregarCategoria = function (categoria) {
    if($scope.propuesta_nueva.categorias == null) {
      $scope.propuesta_nueva.categorias = new Array();
      $scope.propuesta_nueva.categorias.push(categoria);
    } else {
      var aux_index = $scope.propuesta_nueva.categorias.indexOf(categoria);
      if(aux_index > -1) {
        $scope.propuesta_nueva.categorias.splice(aux_index, 1);
      } else {
        $scope.propuesta_nueva.categorias.push(categoria);
      }
    }
  };
  this.impacto = function () {
    $location.path( '/create-impacto' );
  };
  this.beneficios = function () {
    $location.path( '/create-beneficios' );
  };
  this.contexto = function () {
    $location.path( '/create-contexto' );
  };
  this.detalle = function () {
    $location.path( '/detail' );
  };
  this.publicar = function () {
    if($rootScope.usuario) {
      $scope.propuesta_nueva.autor = $rootScope.usuario.nombre;
      $scope.propuesta_nueva.autorId = $rootScope.usuario._id;
    } else {
      $scope.propuesta_nueva.autor = 'ANÓNIMO';
    }
    propuestas.save($scope.propuesta_nueva)
    .success(function (data) {
      $location.path( '/detail/' + data._id);
    })
    .error(function (err) {
      $location.path( '/' );
    });
  };
}]);

/**
Controlador que hace las operaciones del HOME
*/
ctrls.controller('PropuestaHomeCtrl', [
  '$scope', '$rootScope', '$location', '$cookies', 'propuestas',
  function ($scope, $rootScope, $location, $cookies, propuestas) {
  $scope.currentMenu = 'home';
  propuestas.getAllCategorias()
  .success(function (data) {
    $scope.categorias = data;
  })
  .error(function (err) {
    $scope.categorias = aux_categorias;
  });
  propuestas.searchTop({alcance: 'Nacional'})
  .success(function (data) {
    $scope.top_nacional = data;
  })
  .error(function () {
    $scope.top_nacional = null;
  });
  propuestas.searchTop({alcance: 'Local'})
  .success(function (data) {
    $scope.top_local = data;
  })
  .error(function () {
    $scope.top_local = null;
  });

  propuestas.getTopList('ALL')
  .success(function (data) {
    $scope.populares = data;
  })
  .error(function () {
    $scope.populares = [];
  });
  $scope.actualizarLista = function (alcance) {
    propuestas.getTopList(alcance)
    .success(function (data) {
      $scope.populares = data;
    })
    .error(function () {
      $scope.populares = [];
    });
  };
}]);

/**
Controlador para el detalle de la PROPUESTA
*/
ctrls.controller('PropuestaDetailCtrl',
['$scope', '$routeParams', 'propuestas', function ($scope, $routeParams, propuestas) {
  $scope.currentMenu = 'detail';
  propuestas.get($routeParams.id)
  .success(function (data) {
    $scope.item = data;
  })
  .error(function (err) {
    $scope.item = null;
  });
}]);

/**
Controlador para editar la PROPUESTA
*/
ctrls.controller('PropuestaEditCtrl', function ($scope, $routeParams, propuestas) {
  $scope.currentMenu = 'detail';
  propuestas.get($routeParams.id)
  .success(function (data) {
    $scope.propuesta = data;
  })
  .error(function (err) {
    $scope.item = null;
  });

  this.publicar = function () {
    if($rootScope.usuario) {
      $scope.propuesta.autor = $rootScope.usuario.nombre;
      $scope.propuesta.autorId = $rootScope.usuario._id;
    } else {
      $scope.propuesta.autor = 'ANÓNIMO';
    }
    propuestas.save($scope.propuesta)
    .success(function (data) {
      $location.path( '/detail/' + data._id);
    })
    .error(function (err) {
      $location.path( '/' );
    });
  };
});

/**
Controlador para las LISTAS de las PROPUESTAS
*/
ctrls.controller('PropuestaListCtrl', [
  '$scope', '$routeParams', 'propuestas',
  function ($scope, $routeParams, propuestas) {
    $scope.currentMenu = 'list';
    if(!$routeParams.filter) {
      $scope.filterCategoria = new Array();
    } else {
      $scope.filterCategoria = [$routeParams.filter];
    }

    $scope.filterAlcance = 'ALL';
    propuestas.getAll()
    .success(function (data) {
      $scope.list = data;
    })
    .error(function () {
      $scope.list = [];
    });

    if($routeParams.atendida === undefined) {
      $scope.filterAtendida = '!';
      propuestas.getAllCategorias()
      .success(function (data) {
        $scope.categorias = data;
      })
      .error(function (err) {
        $scope.categorias = aux_categorias;
      });
    } else {
      var filter = {};
      if($routeParams.atendida == 'atendida') {
        $scope.filterAtendida = true;
        filter = {atendida: true};
      } else {
        $scope.filterAtendida = '!';
        filter = {atendida: {$in: [null, false]}};
      }
      propuestas.getFilter(filter)
      .success(function (data) {
        $scope.list = data;
      })
      .error(function () {
        $scope.list = [];
      });
    }

    $scope.addFilterCategoria = function (categoria) {
      if($scope.filterCategoria.length == 0) {
        $scope.filterCategoria.push(categoria);
      } else {
        var aux_index = $scope.filterCategoria.indexOf(categoria);
        if(aux_index > -1) {
          $scope.filterCategoria.splice(aux_index, 1);
        } else {
          $scope.filterCategoria.push(categoria);
        }
      }
    };
}]);

/**
Controlador para las operaciones CRUD de las Categorias
*/
ctrls.controller('CategoriasCtrl', ['$scope', 'categorias', function ($scope, categorias) {
  $scope.categorias = categorias.getAll()
  .success(function (data) {
    $scope.categorias = data;
  })
  .error(function (err) {
    $scope.categorias = [];
  });
  $scope.categoria_nueva = {};

  $scope.guardar = function () {
    categorias.save($scope.categoria_nueva);
    $scope.categoria_nueva = null;
    $scope.categorias = categorias.getAll()
    .success(function (data) {
      $scope.categorias = data;
    })
    .error(function (err) {
      $scope.categorias = [];
    });
  };

  $scope.borrar = function (id) {
    categorias.remove(id);
    $scope.categorias = categorias.getAll()
    .success(function (data) {
      $scope.categorias = data;
    })
    .error(function (err) {
      $scope.categorias = [];
    });
  };
}]);
/**
Controlador de TIPS, permite Agregar, Borrar y Listar
*/
ctrls.controller('TipsCtrl', ['$scope', 'tips', function ($scope, tips) {
  $scope.tip = null;
  $scope.guardar = function () {
    tips.save($scope.tip).success(function () {list();});
    $scope.tip = null;
  };
  $scope.borrar = function (id) {
    tips.remove(id).success(function () {list();});
  };
  function list() {
    tips.getAll()
    .success(function (data) {
      $scope.tips =  data;
    })
    .error(function (err) {
      $scope.tips = [];
    });
  };
}]);
/**
Controlador para los USUARIOS, registro y login
*/
ctrls.controller('UserCtrl', [
  '$scope', '$rootScope', '$cookies', '$location', 'usuarios',
  function ($scope, $rootScope, $cookies, $location, usuarios) {
    if($rootScope.usuario == null) {
      $scope.usuario = {};
      $scope.log = {}
      $scope.dd;$scope.mm;$scope.aaaa;$scope.msg = {tipo:null,texto:''};
    } else {
      var aux_date = new Date($rootScope.usuario.nacimiento);
      $scope.dd = aux_date.getDate();
      $scope.mm = aux_date.getMonth()+1;
      $scope.aaaa = aux_date.getFullYear();
    }

    this.registrar = function () {
      $scope.usuario.nacimiento = new Date($scope.aaaa, $scope.mm-1, $scope.dd);
      usuarios.save($scope.usuario).success(function (data) {
        $scope.msg.tipo = 'OK';
        $scope.msg.texto = "Credenciales de acceso correctas.";
        $cookies.putObject('usuario', data);
        $rootScope.usuario = $cookies.getObject('usuario');
        $location.path('/');
      });
    };
    this.actualizar = function () {

    };
    this.ingresar = function () {
      usuarios.get({email:$scope.log.email,password:$scope.log.password})
      .success(function (data) {
        if(!data) {
          $scope.msg.tipo = 'ERR';
          $scope.msg.texto = "Credenciales de acceso incorrectas.";
        } else {
          $scope.msg.tipo = 'OK';
          $scope.msg.texto = "Credenciales de acceso correctas.";
          $cookies.putObject('usuario', data);
          $rootScope.usuario = $cookies.getObject('usuario');
          $location.path('/');
        }
      })
      .error(function (err) {
        return;
      });
      $scope.usuario = {};
    };
}]);

ctrls.controller('UsersCtrl', function ($rootScope, $scope, $location, usuarios) {
  list();

  function list() {
    usuarios.getAll()
    .success(function (data) {
      $scope.usuarios = data;
    })
    .error(function () {
      $scope.usuarios = [];
    });
  };
});
