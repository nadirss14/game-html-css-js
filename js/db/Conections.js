const btnAddPost = document
  .querySelector("#btnAddPost")
  .addEventListener("click", this.handlerAddPost);

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

  getPost(uid) {}

  getAll(container) {
    this.db.collection("post").onSnapshot(querySnapshot => {
      if (querySnapshot.empty) {
        container.innerHTML = this.getDefaultTemplatePost();
      } else {
        querySnapshot.forEach(post => {
          container.innerHTML = this.getTemplatePost(post.data());
        });
      }
    });
  }

  createPost(author, description, title, image, video, tags) {
    return this.db
      .collection("post")
      .add({
        author: author,
        description: description,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        title: title,
        image: image,
        video: video,
        tag: tags
      })
      .then(refDoc => {
        console.log(`Id creado con identificador ${refDoc.id}`);
      })
      .catch(error => {
        console.log(`Error al crear el post mensaje: ${error.message}`);
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
    debugger;
    const template = `<article class="post__item">
                  <h2 class="post__title"><strong>${post.title}</strong></h2>
                  <div class="post__media--container">
                    <img src="../images/banner.jpg" class="post__image" />
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
                  <h5 class="post__date">${new Date(post.date.seconds)}</h5>
                </article>`;
    return template;
  }
}

function handlerAddPost() {
  const user = firebase.auth().currentUser;
  let author = "anonimus";

  if (user) {
    author = user.displayName;
  }

  const uid = user.uid;
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const image = document.querySelector("#image").value;
  const video = document.querySelector("#video").value;
  const tags = [];

  window.Conections = new Conections();
  window.Conections.createPost(author, description, title, image, video, tags);
}

function handlerGetAllPost() {
  debugger;
  const container = document.querySelector("#list_post");
  window.Conections = new Conections();
  window.Conections.getAll(container);
}

handlerGetAllPost();
