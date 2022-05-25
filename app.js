window.onload = () => {
  //constructor
  class Book {
    constructor(author, title, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }

  let myLibrary = [];

  //función para añadir libros
  function addBook(author, title, pages, read) {
    newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
  }

  //test
  addBook("J.R.R. Tolkien", "The Hobbit", "399", false);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", false);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);
  addBook("J.R.R. Tolkien", "The Hobbit", "399", true);

  //botón de añadir libros; spawn del form y toggles
  document.querySelector("#addBook").addEventListener("click", () => {
    document.querySelector(".addForm").classList.remove("inv");
    document.querySelector("#addBook").classList.add("inv");
    document.querySelector("#submitButton").addEventListener("click", () => {
      let author = document.querySelector("#author").value;
      let title = document.querySelector("#title").value;
      let pages = document.querySelector("#pages").value;
      let read = document.querySelector("#read").checked;

      if (author && title && pages) {
        addBook(author, title, pages, read);
        restartShowcase();
        document.querySelector(".addForm").classList.add("inv");
        document.querySelector("#addBook").classList.remove("inv");
      } else {
        console.log("error: bad input!");
        return false;
      }
    });
  });

  function restartShowcase() {
    console.log(myLibrary);
    //reset showcase
    document.querySelector("#showcase").innerHTML = "";
    //show new showcase
    showBooks();
  }

  //@mode: cantidad de libros por estantería
  function showBooks() {
    let n;
    //función que añade los libros
    for (i in myLibrary) {
      let currentBooks = parseInt(i);
      //genera estanterías (divs) para organizar los libros
      if (currentBooks % 4 == 0) {
        n = currentBooks / 4;
        document.querySelector("#showcase").innerHTML += `
        <div class = 'shelf' id = 'n${n}'>`;
      } else if (!document.querySelector(`#n0`)) {
        document.querySelector("#showcase").innerHTML += `
        <div class = 'shelf' id = 'n0'>`;
        n = 0;
      }
      //mete los libros en la "estantería" correspondiente
      document.querySelector(`#n${n}`).innerHTML += `
      <div class = 'book n${i}'>
        <h1 class="front"> ${myLibrary[i].title} </h1>    
        <div class = 'side'>
          <h1> Title: ${myLibrary[i].title} </h1>
          <h1> Author: ${myLibrary[i].author} </h1>
          <h1> Pages: ${myLibrary[i].pages} </h1>
          <h1> Read: ${myLibrary[i].read} </h1>
          <button id = 'removeButton'>remove</button>
          <button id = 'markAsRead'>Read</button>
        </div>
      </div>
      `;
    }

    //toma de la classlist la id (n10 p.ej., y borra la n): índice del array de libros.
    document.querySelectorAll("#removeButton").forEach((el) => {
      el.addEventListener("click", function (e) {
        let parentNode = e.target.parentNode.parentNode.classList[1];
        parentNode = parentNode.slice(1);
        delete myLibrary[parentNode];
        restartShowcase();
      });
    });
    document.querySelectorAll("#markAsRead").forEach((el) => {
      el.onclick = function (e) {
        let parentNode = e.target.parentNode.parentNode.classList[1];
        parentNode = parentNode.slice(1);
        myLibrary[parentNode].read = !myLibrary[parentNode].read == true;
        restartShowcase();
      };
    });

    //esta función encuentra dónde se ha activado el evento y añade la clase que gira el libro
    document.querySelectorAll(".book").forEach((el) => {
      el.addEventListener("click", function (e) {
        let n =
          e.target.parentNode.parentNode.classList[1] ||
          e.target.parentNode.classList[1] ||
          e.target.classList[1];
        n = n.slice(1);
        if (document.querySelector(`.n${n}`)) {
          let getClasses = document.querySelector(`.n${n}`).classList;
          if (getClasses.contains("rotateSide")) {
            getClasses.remove("rotateSide");
            getClasses.add("rotateFront");
          } else if (!getClasses.contains("rotateSide")) {
            getClasses.add("rotateSide");
            if (getClasses.contains("rotateFront")) {
              getClasses.remove("rotateFront");
            }
          }
        }
      });
    });
  }

  showBooks();
};
