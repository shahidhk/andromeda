var kadaiApp = angular.module('kadaiApp', ['KadaiModel', 'ngTouch']);
var baseUrl = 'http://192.168.2.10:1234'


kadaiApp.controller('IndexCtrl', function ($scope, KadaiRestangular) {
  steroids.view.navigationBar.show("Find a Kadai !");

  $scope.baseUrl = baseUrl;

  var listView = new steroids.views.WebView("/views/kadai/list.html")
  listView.preload()
  // Helper function for opening new webviews
  $scope.open = function(view) {
    if (view == 'list'){
      steroids.layers.push(listView);
      message = {
        recipient: "listView",
        message: "load"
      }
      window.postMessage(message);
    } else {
      webView = new steroids.views.WebView("/views/kadai/"+view+".html");
      steroids.layers.push(webView);
      steroids.view.setBackgroundColor("#FFFFFF");
    }
    
  };

});


// Index: http://localhost/views/kadai/index.html

kadaiApp.controller('ListCtrl', function ($scope, KadaiRestangular) {
  $scope.baseUrl = baseUrl;


  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/kadai/show.html?id="+id);
    steroids.layers.push(webView);
  };

  $scope.fetch = function(){
    alert('scope called');
  // Fetch all objects (see app/models/kadai.js)
  KadaiRestangular.all('kadai').getList().then( function(kadais) {
    $scope.kadais = kadais;
    $scope.apply();

  });
}

  // Native navigation
  steroids.view.navigationBar.show("Kadai index");
  steroids.view.setBackgroundColor("#FFFFFF");

});


// Show: http://localhost/views/kadai/show.html?id=<id>

kadaiApp.controller('ShowCtrl', function ($scope, $filter, KadaiRestangular) {
  $scope.baseUrl = baseUrl;


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
  $scope.baseUrl = baseUrl;
  steroids.view.navigationBar.show("Upload a Kadai");


  
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

kadaiApp.controller('MapCtrl', function ($scope, KadaiRestangular) {
    $scope.baseUrl = baseUrl;
    steroids.view.navigationBar.show("Google Maps Demo");
    
});

kadaiApp.controller('UserCtrl', function ($scope, KadaiRestangular) {
    $scope.baseUrl = baseUrl;
    steroids.view.navigationBar.show("User");
    
});

kadaiApp.controller('CategoriesCtrl', function ($scope) {
  var anim = new steroids.Animation({
    transition: 'slideFromRight', 
    duration: '0.1', 
    reversedDuration: '0.1'
  });

      var userProfileWebView = new steroids.views.WebView('views/kadai/UserProfile.html');
      var searchPageWebView = new steroids.views.WebView('views/kadai/SearchPage.html');
      var top20WebView = new steroids.views.WebView('views/kadai/Top20.html');
      var searchPageWebView = new steroids.views.WebView('views/kadai/SearchPage.html');
      var photoEditWebView = new steroids.views.WebView('views/kadai/PhotoEdit.html');
      var settingsWebView = new steroids.views.WebView('views/kadai/Settings.html');

userProfileWebView.preload()
searchPageWebView.preload()
top20WebView.preload()
searchPageWebView.preload()
photoEditWebView.preload()
settingsWebView.preload()

  steroids.view.navigationBar.show("Find a Kadai !");
  $scope.button2Tap = function() {
      return steroids.layers.push({
        view: userProfileWebView,
        animation: anim
      });
    };
    $scope.button4Tap = function() {
      return steroids.layers.push({
        view: searchPageWebView,
        animation: anim
      });
    };
    $scope.button5Tap = function() {
      return steroids.layers.push({
        view: top20WebView,
        animation: anim
      });
    };
    $scope.button6Tap = function() {
      return steroids.layers.push({
        view: searchPageWebView,
        animation: anim
      });
    };
    $scope.button7Tap = function() {
      return steroids.layers.push({
        view: photoEditWebView,
        animation: anim
      });
    };
    $scope.button8Tap = function() {
      return steroids.layers.push({
        view: settingsWebView,
        animation: anim
      });
    };

});

kadaiApp.controller('ActivityLogCtrl', function ($scope) {
  steroids.view.navigationBar.show("ActivityLog");

});

kadaiApp.controller('AddAKadaiCtrl', function ($scope) {
  steroids.view.navigationBar.show("Add a Kadai");
  $scope.button5Tap = function() {
      var photoEditWebView;
      photoEditWebView = new steroids.views.WebView('views/kadai/PhotoEdit.html');
      return steroids.layers.push({
        view: photoEditWebView
      });
    };
    $scope.button6Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
});

kadaiApp.controller('AddPhotoToKadaiCtrl', function ($scope) {
  steroids.view.navigationBar.show("AddPhotoToKadai");

});

kadaiApp.controller('AddReviewCtrl', function ($scope) {
  steroids.view.navigationBar.show("AddReview");
  $scope.button1Tap = function() {
      return steroids.layers.pop({});
    };
});

kadaiApp.controller('FavouritesCtrl', function ($scope) {
  steroids.view.navigationBar.show("Favourites");

});

kadaiApp.controller('KadaiHygieneCtrl', function ($scope) {
  steroids.view.navigationBar.show("KadaiHygiene");

});

kadaiApp.controller('KadaiMenuCtrl', function ($scope) {
  steroids.view.navigationBar.show("KadaiMenu");

});

kadaiApp.controller('KadaiPhotoCtrl', function ($scope) {
  steroids.view.navigationBar.show("KadaiPhoto");
  $scope.button1Tap = function() {
      var addPhotoToKadaiWebView;
      addPhotoToKadaiWebView = new steroids.views.WebView('views/kadai/AddPhotoToKadai.html');
      return steroids.layers.push({
        view: addPhotoToKadaiWebView
      });
    };
});

kadaiApp.controller('KadaiProfileCtrl', function ($scope) {
  steroids.view.navigationBar.show("KadaiProfile");
  $scope.picture_field1Tap = function() {
      var kadaiPhotoWebView;
      kadaiPhotoWebView = new steroids.views.WebView('views/kadai/KadaiPhoto.html');
      return steroids.layers.push({
        view: kadaiPhotoWebView
      });
    };
    $scope.button2Tap = function() {
      var kadaiMenuWebView;
      kadaiMenuWebView = new steroids.views.WebView('views/kadai/KadaiMenu.html');
      return steroids.layers.push({
        view: kadaiMenuWebView
      });
    };
    $scope.button3Tap = function() {
      var kadaiReviewWebView;
      kadaiReviewWebView = new steroids.views.WebView('views/kadai/KadaiReview.html');
      return steroids.layers.push({
        view: kadaiReviewWebView
      });
    };
    $scope.HygieneTap = function() {
      var kadaiHygieneWebView;
      kadaiHygieneWebView = new steroids.views.WebView('views/kadai/KadaiHygiene.html');
      return steroids.layers.push({
        view: kadaiHygieneWebView
      });
    };
});

kadaiApp.controller('KadaiReviewCtrl', function ($scope) {
  steroids.view.navigationBar.show("KadaiReview");
  $scope.button1Tap = function() {
      var addReviewWebView;
      addReviewWebView = new steroids.views.WebView('views/kadai/AddReview.html');
      return steroids.layers.push({
        view: addReviewWebView
      });
    };
});

kadaiApp.controller('MapCtrl', function ($scope) {
  steroids.view.navigationBar.show("Map");
  $scope.list1ListTap = function() {
      return (function(_arg) {
        var item, kadaiProfileWebView, queryString;
        item = _arg[0];
        queryString = '?id=' + item['id'];
        kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html' + queryString);
        return steroids.layers.push({
          view: kadaiProfileWebView
        });
      })(arguments);
    };
});

kadaiApp.controller('PhotoEditCtrl', function ($scope) {
  steroids.view.navigationBar.show("PhotoEdit");
  $scope.button1Tap = function() {
      return steroids.layers.pop({});
    };
});

kadaiApp.controller('SearchPageCtrl', function ($scope) {
  steroids.view.navigationBar.show("SearchPage");
  $scope.card_with_image_on_left_two_text_rows1Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
    $scope.card_with_image_on_left_two_text_rows2Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
    $scope.card_with_image_on_left_two_text_rows3Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
    $scope.card_with_image_on_left_two_text_rows4Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
});

kadaiApp.controller('SettingsCtrl', function ($scope) {
  steroids.view.navigationBar.show("Settings");

});

kadaiApp.controller('SignInUpCtrl', function ($scope) {
  steroids.view.navigationBar.show("SignInUp");

});

kadaiApp.controller('Top20Ctrl', function ($scope) {
  steroids.view.navigationBar.show("Top20");
  $scope.card_with_image_on_left_two_text_rows1Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
    $scope.card_with_image_on_left_two_text_rows2Tap = function() {
      var kadaiProfileWebView;
      kadaiProfileWebView = new steroids.views.WebView('views/kadai/KadaiProfile.html');
      return steroids.layers.push({
        view: kadaiProfileWebView
      });
    };
});

kadaiApp.controller('UserProfileCtrl', function ($scope) {
  steroids.view.navigationBar.show("UserProfile");
  $scope.button1Tap = function() {
      var signInUpWebView;
      signInUpWebView = new steroids.views.WebView('views/kadai/SignInUp.html');
      return steroids.layers.push({
        view: signInUpWebView
      });
    };
    $scope.button2Tap = function() {
      var activityLogWebView;
      activityLogWebView = new steroids.views.WebView('views/kadai/ActivityLog.html');
      return steroids.layers.push({
        view: activityLogWebView
      });
    };
    $scope.button3Tap = function() {
      var favouritesWebView;
      favouritesWebView = new steroids.views.WebView('views/kadai/Favourites.html');
      return steroids.layers.push({
        view: favouritesWebView
      });
    };
});