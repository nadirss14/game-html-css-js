const btnAddPost = document
  .querySelector("#btnAddPost")
  .addEventListener("click", this.handlerAddPost);

const btnUploadPost = document
  .querySelector("#image")
  .addEventListener("change", this.handlerUploadImage);

class Conections {
  constructor() {
    this.db = this.getInstance();
  }

  getInstance = () => {
    const db = firebase.firestore();
    const settings = {};
    db.settings(settings);
    return db;
  };
}

class Post {
  constructor() {
    this.db = new Conections().db;
  }
  getMyPost(author) {
    this.db
      .collection("post")
      .where("author", "==", author)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.empty) {
          container.innerHTML = this.getDefaultTemplatePost();
        } else {
          container.innerHTML = "";
          querySnapshot.forEach(post => {
            container.innerHTML =
              container.innerHTML + this.getTemplatePost(post.data());
          });
        }
      });
  }

  getAll(container) {
    this.db
      .collection("post")
      .orderBy("date", "asc")
      .onSnapshot(
        querySnapshot => {
          if (querySnapshot.empty) {
            container.innerHTML = this.getDefaultTemplatePost();
          } else {
            container.innerHTML = "";
            querySnapshot.forEach(post => {
              container.innerHTML =
                container.innerHTML + this.getTemplatePost(post.data());
            });
          }
        },
        error => {
          swal("Sorry!!! :)", error.message, "error");
        }
      );
  }

  createPost(uid, author, description, title, image, video, tags) {
    return this.db
      .collection("post")
      .add({
        uid: uid,
        author: author,
        description: description,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        title: title,
        image: image,
        video: video,
        tag: tags
      })
      .then(refDoc => {
        swal("Exito!!! :)", `Post creado con id: ${refDoc.id}`, "success");
      })
      .catch(error => {
        swal(
          "Sorry!!! :)",
          `Error al crear el post mensaje: ${error.message}`,
          "error"
        );
      });
  }

  updatePost() {}

  deletePost() {}

  getDefaultTemplatePost() {
    const template = `<article class="post__item">
                      <h2 class="post__title"><strong>Titulo</strong></h2>
                      <div class="post__media--container">
                        <img src="../images/banner.jpg" class="post__image" />
                      </div>
                      <p class="post__text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only
                        five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with
                        the release of Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum
                      </p>
                      <div class="post__media--container">
                        <iframe
                          class="post__video"
                          src="https://www.youtube.com/watch?v=6pwkk4En9IU"
                        >
                        </iframe>
                      </div>
                      <h5 class="post__author">Crete by: nadir.soza@gmail.com</h5>
                      <h5 class="post__date">26-12-2019 15:15:10.000</h5>
                    </article>`;
    return template;
  }

  getTemplatePost(post) {
    const template = `<article class="post__item">
                    <h2 class="post__title"><strong>${post.title}</strong></h2>
                    <div class="post__media--container">
                      <img src="${post.image}" class="post__image" />
                    </div>
                    <p class="post__text">
                      ${post.description}
                    </p>
                    <div class="post__media--container">
                      <iframe
                        class="post__video"
                        src="https://www.youtube.com/watch?v=6pwkk4En9IU"
                      >
                      </iframe>
                    </div>
                    <h5 class="post__author">Crete by: ${post.author}</h5>
                    <h5 class="post__date">${new Date(
                      post.date.seconds
                    ).toDateString()}</h5>
                  </article>`;
    return template;
  }

  uploadImageToPost(file) {
    const user = firebase.auth().currentUser;
    const refStorage = firebase
      .storage()
      .ref(`images/${user.uid}/${file.name}`);
    const task = refStorage.put(file);
    task.on(
      "state_changed",
      snapshot => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Porcentaje de carga: ${percent} %`);
      },
      error => {
        console.log(`Error en la carga del archivo message: ${error.message}`);
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            console.log(url);
            sessionStorage.setItem("imgNewPost", url);
          })
          .catch(error => {
            console.log(`Error almacenando el URL: ${error.message}`);
          });
      }
    );
  }
}

function handlerAddPost() {
  const user = firebase.auth().currentUser;
  let author = "anonimus";

  if (user) {
    author = user.displayName;
  }

  const uid = user.uid || "";
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const image = sessionStorage.getItem("imgNewPost");
  const video = document.querySelector("#video").value;
  const tags = [];

  window.Conections = new Conections();
  window.Conections.createPost(
    uid,
    author,
    description,
    title,
    image,
    video,
    tags
  );
  handlerGetAllPost();
}

function handlerGetAllPost() {
  const container = document.querySelector("#list_post");
  window.Post = new Post();
  window.Post.getAll(container);
}

function handlerUploadImage(event) {
  const file = event.target.files[0];

  window.Post = new Post();
  window.Post.uploadImageToPost(file);
}

handlerGetAllPost();
