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
    
    const booksImages = document.querySelectorAll(select.containerOf.images);

    for(let image of booksImages){
      
      image.addEventListener('dblclick', function(event){
        event.preventDefault();

        image.classList.add('favorite');

        const bookId = image.getAttribute('data-id');

        favoriteBooks.push(bookId);
        
      });
    }

    

  }

  render();
  initAction();
  
} 