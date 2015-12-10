var app = angular.module('ppcFilters', []);

app.filter('hasCategories', function () {
  return function (items, categorias) {
    var returnArray = [];
    if(items === undefined) {
      return;
    }
    var len = items.length;
    var lenCategorias = categorias.length;
    if(lenCategorias <= 0) {
      return items;
    }
    for(var i = 0; i < len; i++) {
      for(var j = 0; j < lenCategorias; j++) {
        if( items[i].categorias.indexOf(categorias[j]) > -1) {
          returnArray.push(items[i]);
          break;
        }
      }
    }
    return returnArray;
  }
});

app.filter('hasAlcance', function () {
  return function (items, alcance) {
    var returnArray = [];
    if(items == undefined) {
      return;
    }
    var len = items.length;
    if(alcance == 'ALL') {
      return items;
    }
    for(var i = 0; i < len; i++) {
      if(items[i].alcance == alcance) {
        returnArray.push(items[i]);
        break;
      }
    }
    return returnArray;
  }
});
