var app = angular.module('servicio', []);

app.factory('demoData', [function () {
  return {
    categorias: ['Agricultura','Reformas políticas','Derechos civiles','Políticas públicas','Protección al consumidor','Políticas laborales','Justicia criminal y fuerza pública','Derechos humanos','Economía','Seguridad Social','Educación','Innovación tecnológica y medios de comunicación',
    'Energía','Transportes','Medio ambiente','Caminos y vías de comunicación','Familia','Espacios públicos','Salud','Asuntos electorales','Constitución Política','Leyes Estatales','Leyes Municipales','Reglamentos'],
    propuestas: [
      {
        id: 1,
        fecha: Date.now,
        votos: 1200,
        autor: 'NOMBRE APELLIDO APELLIDO',
        titulo: 'TITULO',
        categorias: ['Agricultura','Innovación tecnológica y medios de comunicación','Caminos y vías de comunicación'],
        representantes: [
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:true},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
        ]
      },
      {
        id: 2,
        fecha: Date.now,
        votos: 1200,
        autor: 'NOMBRE APELLIDO APELLIDO',
        titulo: 'TITULO',
        categorias: ['Agricultura','Innovación tecnológica y medios de comunicación','Caminos y vías de comunicación'],
        representantes: [
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:true},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
        ]
      },
      {
        id: 3,
        fecha: Date.now,
        votos: 1200,
        autor: 'NOMBRE APELLIDO APELLIDO',
        titulo: 'TITULO',
        categorias: ['Agricultura','Innovación tecnológica y medios de comunicación','Caminos y vías de comunicación'],
        representantes: [
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:true},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
        ]
      },
      {
        id: 4,
        fecha: Date.now,
        votos: 1200,
        autor: 'NOMBRE APELLIDO APELLIDO',
        titulo: 'TITULO',
        categorias: ['Agricultura','Innovación tecnológica y medios de comunicación','Caminos y vías de comunicación'],
        representantes: [
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:true},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
        ]
      },
      {
        id: 5,
        fecha: Date.now,
        votos: 1200,
        autor: 'NOMBRE APELLIDO APELLIDO',
        titulo: 'TITULO',
        categorias: ['Agricultura','Innovación tecnológica y medios de comunicación','Caminos y vías de comunicación'],
        representantes: [
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:true},
          {nombre:'LIC. NOMBRE APELLIDO APELLIDO',cargo:'SECRETARIO DE ALGO',status:false},
        ]
      }
    ],
    tips: [
      '1Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '2Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '3Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '4Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '5Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '6Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '7Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ]
  };
}]);
