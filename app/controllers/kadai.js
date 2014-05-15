var kadaiApp = angular.module('kadaiApp', ['KadaiModel', 'ngTouch']);


kadaiApp.controller('IndexCtrl', function ($scope, KadaiRestangular) {
  steroids.view.navigationBar.show("Find a Kadai !");

  // Helper function for opening new webviews
  $scope.open = function(view) {
    webView = new steroids.views.WebView("/views/kadai/"+view+".html");
    steroids.layers.push(webView);
    steroids.view.setBackgroundColor("#FFFFFF");
  };

});


// Index: http://localhost/views/kadai/index.html

kadaiApp.controller('ListCtrl', function ($scope, KadaiRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/kadai/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects (see app/models/kadai.js)
  KadaiRestangular.all('kadai').getList().then( function(kadais) {
    $scope.kadais = kadais;
  });

  // Native navigation
  steroids.view.navigationBar.show("Kadai index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/kadai/show.html?id=<id>

kadaiApp.controller('ShowCtrl', function ($scope, $filter, KadaiRestangular) {

  // Fetch all objects from the local JSON (see app/models/kadai.js)
  // KadaiRestangular.all('kadai').getList().then( function(kadais) {
  //   // Then select the one based on the view's id query parameter
  //   $scope.kadai = $filter('filter')(kadais, {pk: steroids.view.params['id']})[0];
  // });

  KadaiRestangular.one('kadai', parseInt(steroids.view.params['id'])).get().then(function(kadai) {
    $scope.kadai = kadai[0];
    steroids.view.navigationBar.show("Kadai: " + $scope.kadai.fields.name );
    steroids.view.setBackgroundColor("#FFFFFF");
  });

  // KadaiRestangular.one('kadai').getList(parseInt(steroids.view.params['id'])).then(function(kadai){
  //   $scope.kadai = kadai[0];
  //   console.log(kadai);
  //   console.log("helo");
  // });

  // Native navigation


});

kadaiApp.controller('UploadCtrl', function ($scope, KadaiRestangular) {
    $scope.uploadKadai = function(){
      var newKadai = {
        name: $scope.name,
        description: $scope.description
      };
      KadaiRestangular.all('kadai').post(newKadai).then(function(result){
        steroids.navigationBar.show('New Kadai Uploaded');
        webView = new steroids.views.WebView("/views/kadai/show.html?id="+result.pk);
        steroids.layers.push(webView);
      }, function(result){
        console.log(JSON.stringify(result));
        alert(JSON.stringify(result))
      });
    };
});


// kadaiApp.controller('NewKadaiCtrl', [ '$scope', function ($scope, KadaiRestangular) {
//   // steroids.view.navigationBar.show("Upload a new Kadai !");

//   // Helper function for opening new webviews
//   $scope.uploadKadai = function() {
//     var newKadai = {
//       name: $scope.name,
//       description: $scope.description
//     };
//     KadaiRestangular.all('kadai').post(newKadai);
//     alert('done');
//   };


// }]);