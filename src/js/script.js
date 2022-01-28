{
  'use strict';
  
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      images: '.book__image'
    },
  };
  
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };
  
  function render(){ 
    /* for each elements */
    for(let eachBook of dataSource.books){
  
      /* generate HTML based on template*/
      const generatedHTML = templates.bookTemplate(eachBook);
  
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
  
      /* find book container */
      const bookListContainer = document.querySelector(select.containerOf.bookList);
  
      /* add book to menu */
      bookListContainer.appendChild(element);
  
    } 
  }
  
  
  const favoriteBooks = [];

  function initAction(){
    /* find all book-image elements */
    const booksImages = document.querySelector(select.containerOf.images);

    //for(let image of booksImages){
    /* add event Listener for a clicked image */
    booksImages.addEventListener('dblclick', function(event){
      event.preventDefault();

      const image = event.target.offsetParent;
        
      /* check if clicked image is already in favoriteBooks array */
      if(image.classList.contains(select.containerOf.images)){

        image.classList.toggle('favorite');

        const bookId = image.getAttribute('data-id');

        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
        
        } else {
          /* find an IndexOf bookId which need to be removed in favoriteBooks array */
          const indexOfRemoveBook = favoriteBooks.indexOf(bookId);
          /* remove a bookId from a favoriteBooks array */
          favoriteBooks.splice(indexOfRemoveBook, 1);
        }
      }
      console.log(favoriteBooks);
    });
  }

  render();
  initAction();
  
} 