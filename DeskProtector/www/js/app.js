// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform, $http, $cordovaPushV5, $rootScope) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	var options = {
  	android: {
  	  senderID: "321125277202"
  	},
 
  };
  
  
  // initialize
  $cordovaPushV5.initialize(options).then(function() {
    // start listening for new notifications
    $cordovaPushV5.onNotification();
    // start listening for errors
    $cordovaPushV5.onError();
    
    // register to get registrationId
    $cordovaPushV5.register().then(function(registrationId) {
      // save `registrationId` somewhere;
	  console.log('reg id - ' + registrationId);
	  alert('reg id - ' + registrationId);
	  $rootScope.id = registrationId;
	  $rootScope.myNum = "8058742471";
	  var Data = { regId: $rootScope.id, num: $rootScope.myNum };
	  $rootScope.url = "http://198.74.52.197/~guitarme/notification";
       console.log('sending GCM registration ID to server' + $rootScope.url+'/insertGCMregId.php');
var res = $http.post($rootScope.url + '/insertGCMregId.php', Data);

      res.success(function(data, status, headers, config) {
        console.log('result '+JSON.stringify(data));
       });

        res.error(function(data, status, headers, config) {
    alert("Please check your internet connection","Error");
            });
	  
    });
	
	  $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
    // data.message,
    // data.title,
    // data.count,
    // data.sound,
    // data.image,
    // data.additionalData
	alert(data);
  });

  // triggered every time error occurs
  $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
    // e.message
	
  });
	
	
  });
	
	
	
  });
})

			