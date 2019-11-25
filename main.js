var d = new Date();
document.cookie = "fecha=" + d.toUTCString(); 

const vueApp = new Vue({
    el: '#vue-root',
    data: { 
        names: ["jose", "pablo", "fausto", "joaquín", "carlos", "sergio"],
        cards: [],
        mytest: "hello world",
    },
    methods: {
        addCard: function () {
            card = this.genCard(this.names);
            this.cards.push(card);
        },
        genCard: function (possible) {
            rndIndex = Math.floor(Math.random() * possible.length);
            rndChoice = possible[rndIndex];

            this.customLog(console.log, "Creado!"); //callback

            return {
                name : rndChoice,
                backgroundclass: [
                    "test-background",
                    rndIndex % 2 ? "test-background-hue" : ""
                ],
            };
        },
        customLog: function (method, message) {
            method(message);
        }
    }
})

// FirebaseUI config.
var firebaseConfig = {
  // metele lo que quieras
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



var uiConfig = {
    signInSuccessUrl: './success',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: 'http://9front.org/coc',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        window.location.assign('https://gnupg.org/');
    }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('sign-in').textContent = 'Sign out';
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
    }
  }, function(error) {
    console.log(error);
  });

window.addEventListener('load', function() {
  initApp();
});

