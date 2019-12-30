const firebaseConfig = {
  apiKey: "AIzaSyC23ZVNCFP05wafAhu346AzwerYuyw7YfY",
  authDomain: "nadirss14-portfolio.firebaseapp.com",
  databaseURL: "https://nadirss14-portfolio.firebaseio.com",
  projectId: "nadirss14-portfolio",
  storageBucket: "nadirss14-portfolio.appspot.com",
  messagingSenderId: "683742480270",
  appId: "1:683742480270:web:f3bc7042562cc6137e86df"
};
firebase.initializeApp(firebaseConfig);

// Registramos el service worker
navigator.serviceWorker
  .register("sw.js")
  .then(register => {
    console.log(register);
    firebase.messaging().useServiceWorker(register);
  })
  .catch(error => {
    console.log(`Error en al registrat el SW ${error.message}`);
  });

// Obtenemos la instancia de messaging
const messaging = firebase.messaging();

// Registramos nuestra llave publica que generamos desde la consola de firebase
messaging.usePublicVapidKey(
  "BA-YTMiBe_b2Ak0UrS-yU25nMquQ0vbu-ZtMxbYTRNweTx8OcyIBAyf2OfXbk8YYRLdwPWjglX9TcmylivcXSD0"
);

// Solicitamos los permisos para recibir las notificaciones y registramos los tokens en firestore
messaging
  .requestPermission()
  .then(() => {
    console.log("permiso otorgado");
    return messaging.getToken();
  })
  .then(token => {
    const db = firebase.firestore();

    db.collection("tokens")
      .doc(token)
      .set({
        token: token
      })
      .then(console.log("token registrado"))
      .catch(error => {
        console.log(`error al insertar el token ${error.message}`);
      });
  });

messaging.onTokenRefresh(() => {
  console.log("token refrescado");
  messaging.getToken().then(token => {
    const db = firebase.firestore();

    db.collection("tokens")
      .doc(token)
      .set({
        token: token
      })
      .catch(error => {
        console.log(`error al insertar el token ${error.message}`);
      });
  });
});

messaging.onMessage(payload => {
  alert("hay un nuevo post");
});
