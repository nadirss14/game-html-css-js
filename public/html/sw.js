importScripts("https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js");
const firebaseConfig = {
  projectId: "nadirss14-portfolio",
  messagingSenderId: "683742480270"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const titleNotification = "Tenemos un nuevo post";
  const optionNotificacion = {
    body: payload.data.titulo,
    icon: "",
    click_action: "https://nadirss14-portfolio.web.app/"
  };

  return screenLeft.registration.showNotification(
    titleNotification,
    optionNotificacion
  );
});
