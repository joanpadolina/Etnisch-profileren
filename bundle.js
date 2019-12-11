var bundle = (function () {
    'use strict';

    function newData () {
      console.log('hoi');
      fetch('dataruw.json').then(function (res) {
        return res.json();
      }).then(function (results) {
        return console.log(results);
      });
    }

    function main () {
      console.log(newData);
    }

    return main;

}());
