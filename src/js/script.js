{
  'use strict';
  
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      images: 'book__image',
      checklist: '.filters',
    },
  };
  
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };
  
  class BookList {

    constructor(){
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initAction();
    }

    initData(){
      const thisBookList = this;

      thisBookList.data = dataSource.books;

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }

    getElements(){

      this.DOM = {};
      this.DOM.booksImages = document.querySelector(select.containerOf.bookList);
      this.DOM.check = document.querySelector(select.containerOf.checklist);
    }

    render(){
      const thisBookList = this;

      for(let eachBook of dataSource.books){

        const ratingBgc = thisBookList.determineRatingBgc(eachBook.rating);
        const ratingWidth = eachBook.rating * 10;
    
        const generatedHTML = templates.bookTemplate({
          id: eachBook.id,
          name: eachBook.name,
          price: eachBook.price,
          image: eachBook.image,
          rating: eachBook.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });
    
        const element = utils.createDOMFromHTML(generatedHTML);
    
        const bookListContainer = document.querySelector(select.containerOf.bookList);
    
        bookListContainer.appendChild(element);
      } 
    }

    initAction(){
      const thisBookList = this;
    
      this.DOM.booksImages.addEventListener('dblclick', function(event){
        event.preventDefault();

        const image = event.target.offsetParent;
          
        /* check if clicked image is already in favoriteBooks array */
        if(image.classList.contains('book__image')){

          image.classList.toggle('favorite');

          const bookId = image.getAttribute('data-id');

          if(!thisBookList.favoriteBooks.includes(bookId)){
            thisBookList.favoriteBooks.push(bookId);
          
          } else {
            /* find an IndexOf bookId which need to be removed in favoriteBooks array */
            const indexOfRemoveBook = thisBookList.favoriteBooks.indexOf(bookId);
            /* remove a bookId from a favoriteBooks array */
            thisBookList.favoriteBooks.splice(indexOfRemoveBook, 1);
          }
        }
        console.log(thisBookList.favoriteBooks);
      });

      this.DOM.check.addEventListener('click', function(event){

        const clickedBox = event.target;

        if(clickedBox.tagName == 'INPUT' && clickedBox.type == 'checkbox' && clickedBox.name == 'filter'){

          if(clickedBox.checked){
          
            thisBookList.filters.push(clickedBox.value);
          } else {
            
            const indexOfRemove = thisBookList.filters.indexOf(clickedBox.value);
            thisBookList.filters.splice(indexOfRemove);
          }
        }
        thisBookList.filterBooks();
      });
    }

    filterBooks(){
      const thisBookList = this;

      for(let book of thisBookList.data){
        let shouldBeHidden = false;
        for(let filter of thisBookList.filters){

          if(!book.details[filter] == false){
            shouldBeHidden = true;
            break;
          }
        }

        const booksImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if(shouldBeHidden === true){
          booksImage.classList.add('hidden');
        } else {
          booksImage.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){

      let background = '';

      if(rating < 6){
        background = 'linear-gradient(to bottom, #fff200 0%, #fff200 100%)';

      } else if (rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #f1c40f 0%, #f1c40f 100%)';

      } else if (rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #e67e22 0%, #e67e22 100%)';

      } else if (rating > 9){
        background = 'linear-gradient(to bottom, #e74c3c 0%, #e74c3c 100%)';
      }

      return background;
    }
  }
  const app = new BookList();

  app;
} 