{

  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      images: '.book__image',
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const filters = [];
  const favoriteBooks = [];

  function render(){
    for(let eachBook of dataSource.books){
      const generatedHTML = templates.bookTemplate(eachBook);
      const element = utils.createDOMFromHTML(generatedHTML);
      console.log('element:', element);
      const bookListContainer = document.querySelector(select.containerOf.bookList);
      bookListContainer.appendChild(element);
    }
  } 
  
  function initActions(){
    const booksList = document.querySelector(select.containerOf.bookList);
    booksList.addEventListener('click', function(event){
      event.preventDefault();
      const image = event.target.offsetParent;
      const idBook = image.getAttribute('data-id');
      if(favoriteBooks.includes(idBook)){
        image.classList.remove('favorite');
        favoriteBooks.pop(idBook);
      }else{
        image.classList.add('favorite');
        favoriteBooks.push(idBook);
      }
      console.log('favoriteBooks', favoriteBooks);
    });
    const filters = [];
    const filterBooksOne = document.querySelector(select.containerOf.filters);
    filterBooksOne.addEventListener('click', function(event){
      const clickedElm = event.target;
      if(clickedElm.tagName == 'INPUT' && clickedElm.type == 'checkbox' && clickedElm.name == 'filter'){
        if(clickedElm.checked){
          filters.push(clickedElm.value);
        }else{
          const valueIndexOf = filters.indexOf(clickedElm.value);
          filters.splice(valueIndexOf, 1);
        }
      }
      console.log('clickedElm:', clickedElm.value);
      console.log('filters', filters);
      filterBooks();
    });
  }

 
  
  
  function filterBooks(){
    for(let book of dataSource.books){
      const filteredBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden === true){
        filteredBook.classList.add('hidden');
      }else{
        filteredBook.classList.remove('hidden');
      }
    }
    
  }
  
  render();
  initActions();
  
  



}