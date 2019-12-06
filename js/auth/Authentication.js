const btnRegistrar = document
  .getElementById("button")
  .addEventListener("click", this.handlerClick);

const btnAuthGoogle = document
  .getElementById("btnAuthGoogle")
  .addEventListener("click", this.handlerAuthGoogleAccount);

const btnSignOut = document
  .getElementById("btnSignOut")
  .addEventListener("click", this.handlerSignOut);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(`${user.displayName} is login`);
  } else {
    console.log(`User dont login`);
  }
});

class Authentication {
  constructor() {}
  authEmailPass(email, password) {}

  createAuthEmailPass(email, password, nombre) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayName: nombre
        });

        const configuration = {
          url: "http://localhost:8080/"
        };

        result.user.sendEmailVerification(configuration).catch(error => {
          console.log(error);
          swal("Ups!!! :(", error.message, "error");
        });

        firebase.auth().signOut();
        swal(
          "Oh la la!!! :)",
          `Bienvenido ${nombre}, debes realizar el proceso de verificación`,
          "success"
        );
      })
      .catch(error => {
        console.log(error);
        swal("Ups!!! :(", error.message, "error");
      });
  }

  authGoogleAccount() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        swal(
          "Oh la la!!! :)",
          `Bienvenido ${result.user.displayName}`,
          "success"
        );
      })
      .catch(error => {
        console.log(error);
        swal("Ups!!! :(", error.message, "error");
      });
  }

  authSignOut() {
    debugger;
    const user = firebase.auth().currentUser;

    return firebase
      .auth()
      .signOut()
      .then(() => {
        debugger;
        swal(`Bye!!! `, user.displayName, "success");
      });
  }
}

function handlerClick() {
  const nombre = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  window.Authentication = new Authentication();
  window.Authentication.createAuthEmailPass(
    email.value,
    password.value,
    nombre.value
  );
}

function handlerAuthGoogleAccount() {
  window.Authentication = new Authentication();
  window.Authentication.authGoogleAccount();
}

function handlerSignOut() {
  window.Authentication = new Authentication();
  window.Authentication.authSignOut();
}
