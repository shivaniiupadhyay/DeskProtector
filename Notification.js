var options = {
  	android: {
  	  senderID: "321125277202"
  	},
    ios: {
      alert: "true",
      badge: "true",
      sound: "true"
    },
    windows: {}
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
    alert("Please check you internet connection","Error");
            });