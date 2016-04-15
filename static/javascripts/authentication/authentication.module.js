(function () {
  'use strict';

  angular
    .module('pando-3d.authentication', [
      'pando-3d.authentication.controllers',
      'pando-3d.authentication.services'
    ]);

  angular
    .module('pando-3d.authentication.controllers', []);

  angular
    .module('pando-3d.authentication.services', ['ngCookies']);
})();
